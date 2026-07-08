FINANCIAL RELATIONSHIP AUDIT
=============================

Date: 2026-07-08T23:47:57+03:00

Scope
-----
Audit and safely refactor circular and inconsistent relationships in the financial model set:
- Invoice
- Payment
- Receipt
- Refund
- VehicleReservation (reservation)
- Sale (represented by Invoice + vehicle ownership)

Goals
-----
- Eliminate circular foreign keys
- Determine canonical ownership for each relation
- Avoid destructive migrations and preserve all existing data
- Keep backward compatibility for callers that supply legacy fields (e.g., invoices created with payment_id)
- Update Eloquent models and services where required

Findings (code verified)
------------------------
1. Circular foreign key detected
   - invoices.payment_id (invoices table) and payments.invoice_id (payments table) both existed.
     Evidence: database/migrations/2026_06_28_163318_create_invoices_table.php (defines invoices.payment_id)
               database/migrations/2026_07_03_145843_add_invoice_id_to_payments_table.php (adds payments.invoice_id)
   - Business problem: duplicate ownership of the invoice-payment relationship creates a circular FK that complicates inserts/updates and can cause referential cycles on delete.

2. Current runtime mappings (models)
   - App\Models\Payment
     - belongsTo Invoice (invoice_id)
     - belongsTo Vehicle, VehicleReservation, User
   - App\Models\Invoice
     - previously belongedTo Payment (payment_id)
     - hasMany Receipts, Refunds
   - App\Models\Receipt
     - belongsTo Payment and Invoice
   - App\Models\Refund
     - belongsTo Payment and Invoice
   - App\Models\VehicleReservation
     - belongsTo Vehicle and User
     - Payments reference reservations via payments.vehicle_reservation_id

Canonical decisions (rationale)
-------------------------------
1. Canonical owner of the invoice-payment relationship: Payment -> invoice
   - Reasoning: Payments are atomic transactions (a payment record) which may be applied to an invoice. A single invoice can have multiple payments (partial payments, instalments, import payments), therefore Invoice should own a collection of Payments (hasMany) and Payment should hold invoice_id (belongsTo).
   - Action: Remove invoices.payment_id column, keep payments.invoice_id as the canonical FK.
   - Business impact: supports partial payments and prevents referential circularity.

2. Receipts and Refunds
   - Canonical: Receipt and Refund belong to Payment (original payment) and may also reference an Invoice for reporting. Keep both belongsTo relationships.
   - Reasoning: A Receipt is generated for a Payment; Refunds are issued against a Payment. Keeping invoice_id on receipts/refunds is useful but not required for referential integrity.

3. VehicleReservation and Payments
   - Canonical: Payments may reference vehicle_reservation_id when they are deposits. VehicleReservation does not need an explicit payments() method (payments exist) but a hasMany payments relation is acceptable and already present on Vehicle via payments(). No schema change required.

4. Cascade rules
   - Existing migrations mostly use nullOnDelete() for user/payment links and cascade on vehicle delete for reservations.
   - No change to cascade behavior was required except resolving circular FK.

Changes made
------------
1. New safe migration: database/migrations/2026_07_09_010000_remove_payment_id_from_invoices.php
   - Behaviour (up):
     - If invoices.payment_id exists:
       - Ensure payments.invoice_id exists (create if missing)
       - Backfill payments.invoice_id from invoices.payment_id using chunked updates (chunkById(500))
       - Drop indexes referencing invoices.payment_id (defensive) and drop the invoices.payment_id foreign and column
     - Non-destructive: columns are nullable; operations are chunked.
   - Behaviour (down):
     - Recreate invoices.payment_id (nullable) and backfill from payments.invoice_id where payments point to invoices (only set when invoices.payment_id is null)
   - Why safe: does not drop payments, preserves mapping by moving invoice->payment link to payments.invoice_id; chunked to avoid long locks.

2. Model changes
   - app/Models/Invoice.php
     - Removed payment() BelongsTo
     - Removed payment_id from $fillable
     - Added payments(): HasMany -> Payment via invoice_id
   - app/Models/Payment.php
     - Left unchanged (payments.invoice() belongsTo remains canonical)

3. Service changes
   - app/Services/Sales/InvoiceService.php
     - Eager load changed from ['vehicle','payment','user'] to ['vehicle','payments','user']
     - On create: detect legacy data['payment_id'] and, if provided, update the corresponding Payment to set invoice_id => new invoice id (attaching the payment to the invoice). This preserves backward compatibility for callers that still supply payment_id in requests.

4. Factories
   - database/factories/InvoiceFactory.php
     - Removed the 'payment_id' field from the factory since invoices no longer store the FK.

Files changed (summary)
-----------------------
- Added: database/migrations/2026_07_09_010000_remove_payment_id_from_invoices.php
- Edited: app/Models/Invoice.php (removed payment relation, added payments hasMany)
- Edited: app/Services/Sales/InvoiceService.php (attach payment on create, eager load payments)
- Edited: database/factories/InvoiceFactory.php (removed payment_id)

Why these changes
-----------------
- Removing circular FK: eliminates referential cycles and matches real-world domain where invoices can have multiple payments.
- Preserving backward compatibility: forms and API callers often send payment_id when creating an invoice. Instead of removing that field from requests (which would be breaking), the InvoiceService now consumes payment_id and migrates the association to payments.invoice_id after invoice creation.
- Non-destructive: all migration steps are reversible and chunked; data is preserved in payments.invoice_id before invoice.payment_id is dropped.

Testing and compatibility notes
-------------------------------
- Unit/integration tests that create invoices with a payment_id (existing tests in tests/Feature) will continue to work because InvoiceService will attach the payment to the invoice after creation.
- Factories were updated to not set invoice.payment_id; tests using factories should still work unless they explicitly assert invoices.payment_id exists (no such assertions detected in current tests).
- Frontend code that sends payment_id in create invoice forms remains compatible.

Remaining recommendations (not changed automatically)
---------------------------------------------------
1. Add PaymentRepository helper methods to fetch payments by invoice in a consistent way (optional).
2. Consider adding payments() relation to VehicleReservation model for symmetry (hasMany Payment via vehicle_reservation_id) to make queries explicit.
3. Review cascadeOnDelete behavior for vehicle_reservations (vehicle_id cascade) to ensure it aligns with business policy: if vehicles are soft-deleted or hard-deleted in production, do reservations need retention?
4. After running the migration in staging and verifying there are no orphan or unexpected null invoice_id values, consider adding a follow-up migration to make payments.invoice_id non-nullable where business rules allow it.

Migration deployment guidance
----------------------------
1. Run on staging first. These operations are chunked; review DB load and adjust chunk size if necessary.
2. After migration, run application tests and smoke tests for invoice/payment flows: invoice creation with payment_id, payment creation with invoice_id, refunds and receipts processing.
3. Once verified, schedule a production deployment during a maintenance window.
4. Monitor for unexpected null invoice_id counts and consult finance team for manual reconciliation if needed.

Audit conclusion
----------------
- Circular FK was confirmed and safely eliminated by migrating canonical ownership to payments.invoice_id.
- Canonical ownership decisions align with typical accounting domain rules: invoices aggregate payments; payments are atomic.
- Changes are backward compatible and non-destructive; services and factories updated to reflect the canonical model.

If desired next steps, the following can be implemented next:
- Add hasMany payments() on VehicleReservation for symmetry and convenience.
- Add database/indexing review to ensure payments.invoice_id is indexed and queries are optimized.
- Add tests asserting that legacy payloads (invoice creation with payment_id) correctly attach payment to invoice.

