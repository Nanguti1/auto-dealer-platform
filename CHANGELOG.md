CHANGELOG
=========

2026-07-09 - Financial branch isolation and authorization hardening
------------------------------------------------------------------
- Added migration: database/migrations/2026_07_09_000000_add_branch_id_to_financial_tables.php
  - Adds nullable branch_id to payments, receipts, refunds, finance_applications, vehicle_reservations, import_payments, vehicle_imports (if missing).
  - Backfills branch_id using deterministic preference maps and chunked updates. Leaves columns nullable for safe rollout.

- Added migration: database/migrations/2026_07_09_010000_remove_payment_id_from_invoices.php
  - Eliminates circular FK between invoices.payment_id and payments.invoice_id by migrating the association to payments.invoice_id.
  - Backfills payments.invoice_id from invoices.payment_id and drops the invoices.payment_id column (reversible down() logic provided).

- Model and service changes
  - app/Models/Invoice.php: removed deprecated payment() BelongsTo and added payments() HasMany
  - app/Services/Sales/InvoiceService.php: updated to attach legacy payment_id payloads to payments.invoice_id and eager-load payments
  - database/factories/InvoiceFactory.php: removed payment_id usage

- Authorization hardening
  - Multiple policies updated to prefer explicit branch checks when branch_id exists, falling back to relationship-based checks otherwise.

Notes
-----
- All migrations are intentionally non-destructive and use chunked updates. Run in staging first and verify data before production deploy.
- Follow-up recommended: make branch_id NOT NULL where safe and add policy/controller tests to cover branch-scoped authorization.

