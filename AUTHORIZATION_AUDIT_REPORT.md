AUTHORIZATION AUDIT REPORT
===========================

Date: 2026-07-09

Scope
-----
Full policy and authorization audit focused on branch isolation and correctness for financial and related domain policies. Files audited and partially remediated: app/Policies/* (notably PaymentPolicy, ReceiptPolicy, RefundPolicy, InvoicePolicy, FinanceApplicationPolicy, VehicleReservationPolicy, ImportShipmentPolicy and others).

Summary of findings
-------------------
1. Over-reliance on relationship traversal
   - Many policies used model->isAccessibleThrough($user, 'relationship') indiscriminately. This can be expensive and less explicit when the model owns branch_id directly.

2. Missing branch-based short-circuit checks
   - When a model has branch_id the simplest, safest authorization check is equality against the user's branch (BranchAware::isAccessibleBy). This was not consistently used.

3. Copy-paste and inconsistent role checks
   - A number of policy methods repeated logic incorrectly (missing parentheses, inconsistent admin/manager role lists). These were normalized.

Remediations applied
--------------------
1. Prefer explicit branch checks when available
   - For models that have branch_id (or will after migrations), policy methods now use the pattern:
     ($model->branch_id ? $model->isAccessibleBy($user) : $model->isAccessibleThrough($user, 'relationship'))
   - This preserves legacy behavior where branch_id is absent while enforcing direct checks when present.

2. Normalized role checks
   - Where actions are manager/admin-only, in_array($user->role?->name, [RoleEnum::ADMIN->value, RoleEnum::MANAGER->value], true) is consistently used.

3. Files updated
   - Examples: app/Policies/PaymentPolicy.php, ReceiptPolicy.php, RefundPolicy.php, InvoicePolicy.php, VehicleReservationPolicy.php, ImportShipmentPolicy.php, LeadPolicy.php, ReviewPolicy.php and several CRM/customer policies.

Remaining gaps (must be validated via tests)
--------------------------------------------
1. Unit tests coverage
   - No comprehensive PHPUnit tests were added for each policy method. Required tests:
     - Positive and negative cases for isAccessibleBy vs isAccessibleThrough fallbacks
     - Role-based allow/deny scenarios (Admin/Manager/User with different branch values)
     - Cases where the branch_id is null (should fall back to isAccessibleThrough)

2. Controller/service-level authorize() calls
   - Controllers that rely on $this->authorize(...) should be spot-checked in staging to ensure no regressions.

3. Edge cases
   - Special business flows (e.g., supervisor/assigned-user vs branch manager) may need custom checks beyond branch ownership; these were intentionally not changed.

Suggested test plan
-------------------
- For each policy updated, add a PHPUnit Policy test that:
  1. Creates two branches A and B, and users in each branch (admin & normal user)
  2. Creates the model under branch A and assert:
     - User from branch A is authorized for allowed actions
     - User from branch B is denied
     - Admin user is authorized regardless of branch if app semantics allow
  3. For models without branch_id simulate older records (branch_id null) and assert isAccessibleThrough behavior remains.

Risk & rollback
----------------
- Risk is low: changes are authorization tightening only when branch_id exists; otherwise behavior preserved.
- Rollback: restore previous policy files from git if regressions detected.

Files changed (examples)
------------------------
- app/Policies/PaymentPolicy.php
- app/Policies/ReceiptPolicy.php
- app/Policies/RefundPolicy.php
- app/Policies/InvoicePolicy.php
- app/Policies/VehicleReservationPolicy.php
- app/Policies/ImportShipmentPolicy.php
- app/Policies/LeadPolicy.php
- app/Policies/ReviewPolicy.php

Next steps (engineering tasks)
------------------------------
1. Implement unit tests for top-critical policies (payments, invoices, refunds, receipts, reservations) — 8-16 hours.
2. Run full test-suite and manual verification on staging after migrations — 2-4 hours.
3. Add controller-level spot checks for authorize() calls — 2-3 hours.

Prepared by: Copilot remediation agent

