FINANCIAL BRANCH ISOLATION REPORT
===============================

Date: 2026-07-09

Scope
-----
This report documents branch-level isolation for the financial domain and remediation performed against the codebase:
- Models audited: Payment, Receipt, Refund, Invoice, FinanceApplication, VehicleReservation, ImportPayment, VehicleImport
- Areas checked: Models (BranchAware trait), migrations, global scopes, services, policies, controllers, factories, indexes and foreign keys

Summary of findings
-------------------
1. BranchAware usage without branch_id column
   - Several financial models used App\Models\Concerns\BranchAware but some DB tables did not consistently include a branch_id column.
   - Specifically: payments, receipts, refunds, finance_applications, vehicle_reservations, import_payments, vehicle_imports lacked guaranteed branch_id in all environments.

2. Missing indexes and foreign keys
   - Some tables lacked a direct branch_id foreign key constraint and index; this impedes efficient branch-scoped queries and may allow inconsistent data.

3. Inconsistent enforcement at creation
   - Services and FormRequests did not uniformly assign branch_id on create; factories and tests also omitted branch population which reduces test coverage for branch-scoped behavior.

Actions performed (non-destructive)
-----------------------------------
1. Added safe migration: database/migrations/2026_07_09_000000_add_branch_id_to_financial_tables.php
   - Adds nullable branch_id FK + index to payments, receipts, refunds, finance_applications, vehicle_reservations, import_payments, vehicle_imports only if missing.
   - Backfills branch_id using deterministic preferences for each table (vehicle.branch_id, invoice.branch_id, vehicle_import.branch_id, user.branch_id, payment.branch_id etc.).
   - Chunked updates (chunkById(500)) to avoid locks; operations are reversible in down().
   - Columns are left nullable to guarantee zero-risk deploy; follow-up migration recommended to enforce NOT NULL after verification.

2. Added foreign key constraints and indexes
   - Each added branch_id column is constrained to branches.id and an index created to improve performance of BranchAware queries.

3. Policy updates
   - Policies were updated to prefer model->isAccessibleBy($user) when a branch_id column exists, falling back to isAccessibleThrough($user, 'relationship') when not.
   - This prevents expensive relationship traversal and enforces explicit branch ownership where available.

4. Factories and services
   - InvoiceService updated to attach legacy payment_id to payments.invoice_id (see FINANCIAL_RELATIONSHIP_AUDIT.md)
   - InvoiceFactory had payment_id removed to avoid creating invoices with the deprecated field.
   - Recommendation: update PaymentFactory, ReceiptFactory, RefundFactory, ImportPaymentFactory to set branch_id where appropriate for tests.

Why these choices
------------------
- Non-destructive: adding nullable columns and backfilling preserves existing data and avoids deployment failures.
- Deterministic backfill: choose authoritative branch source per row to minimize manual reconciliation.
- Performance-safe: chunked updates limit transaction sizes and avoid long locks.
- Authorization-safe: policy changes ensure branch checks are enforced at runtime when branch_id exists.

Remaining issues and recommended follow-up
-----------------------------------------
1. Verification in staging
   - Run migration on staging, verify counts of null branch_id rows per table:
     SELECT COUNT(*) FROM payments WHERE branch_id IS NULL;
   - Investigate unbackfilled rows and create manual reconciliation rules.

2. Make branch_id NOT NULL (optional, after verification)
   - After verifying all rows have branch_id, add a migration to make branch_id non-nullable and add enforcement in FormRequests/services.

3. Update factories & tests
   - Update affected factories to populate branch_id.
   - Add PHPUnit tests that assert branch scoping behavior for financial queries and policies.

4. Enforcement in services and FormRequests
   - Ensure Store/Update FormRequests validate and assign branch_id to created records where applicable.

5. Monitoring
   - Add DB monitoring for unexpected nulls and add a one-off script to list rows with null branch_id for finance teams to reconcile.

Files changed (high-level)
-------------------------
- Added: database/migrations/2026_07_09_000000_add_branch_id_to_financial_tables.php
- Modified (policies): multiple files under app/Policies/* to prefer explicit branch checks
- Modified (services/factories): invoice-related changes (see FINANCIAL_RELATIONSHIP_AUDIT.md)

Estimated effort to finish
-------------------------
- Staging verification and reconciliations: 4-8 engineer hours (depending on data cleanliness)
- Add follow-up NOT NULL migration & tests: 2-4 hours
- Update factories and tests: 2-6 hours

Report prepared by: Copilot (technical remediation agent)


