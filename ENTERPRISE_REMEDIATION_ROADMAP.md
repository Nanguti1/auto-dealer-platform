# ENTERPRISE REMEDIATION ROADMAP
## Part 1 — Foundation & Production Blockers

---

# Overview

This roadmap converts the Enterprise Audit into a prioritized remediation plan.

Every prompt in this document is **independent** and should be executed as a separate task.

For every task:

- Inspect the repository before making changes.
- Never assume missing functionality.
- Preserve existing architecture.
- Preserve coding conventions.
- Do not introduce unnecessary abstractions.
- Maintain backwards compatibility whenever possible.
- Prefer fixing existing implementations over rewriting them.

For every completed task:

- Run all relevant tests.
- Fix any introduced regressions.
- Verify frontend and backend compile successfully.
- Produce a concise completion report.

---

# Prompt 01 — Repository Validation

## Objective

Perform a complete repository validation before any remediation work begins.

This task is intended to establish an accurate baseline.

## Scope

Inspect:

- Laravel backend
- React/Inertia frontend
- Vite configuration
- Composer packages
- npm packages
- Routes
- Policies
- Models
- Services
- Form Requests
- Controllers
- Database migrations

## Verify

Identify:

- missing imports
- missing classes
- broken namespaces
- unresolved references
- duplicated classes
- missing page components
- missing Inertia pages
- missing route targets
- missing controller methods

## Do NOT

- Refactor
- Rename classes
- Modify architecture
- Fix issues

Only identify compile/runtime issues.

## Deliverables

Produce a report containing:

- compile issues
- runtime issues
- missing files
- dependency issues
- estimated severity

## Validation

Run:

- composer install
- npm install
- php artisan optimize:clear
- php artisan route:list
- php artisan test
- npm run build

Fix nothing.

Only report findings.

---

# Prompt 02 — Fix Runtime Fatal Errors

## Objective

Resolve all confirmed runtime fatal errors preventing normal application execution.

These issues block production deployment and take highest priority.

## Scope

Inspect every Service class.

Pay particular attention to:

- parent::create()
- parent::delete()
- parent::update()
- invalid trait usage
- invalid inheritance
- undefined methods
- undefined relationships
- invalid return types

Inspect:

- InvoiceService
- ReceiptService
- RefundService

and every similar service.

## Requirements

Replace invalid implementations with the correct service logic.

Do not rewrite architecture.

Maintain existing APIs.

## Verify

Search for:

parent::

Ensure every occurrence is valid.

## Acceptance Criteria

- no runtime fatal errors
- services execute successfully
- CRUD operations continue functioning
- no broken dependencies

## Validation

Run

- php artisan test
- php artisan optimize
- npm run build

---

# Prompt 03 — Repair Missing Form Requests

## Objective

Repair every controller referencing missing FormRequest classes.

## Scope

Search the entire repository for:

Store*Request

Update*Request

Destroy*Request

Compare referenced classes with actual files.

Identify every missing request.

Examples noted during audit include:

- CRM Tasks
- CRM Activities

but inspect the entire repository.

## Requirements

Create missing FormRequest classes following existing project conventions.

Ensure:

- authorization()
- rules()
- messages() where appropriate

Use validation patterns consistent with similar modules.

Do not duplicate validation logic unnecessarily.

## Acceptance Criteria

Every controller reference resolves successfully.

No missing imports remain.

Validation behaves consistently across modules.

## Validation

Run

php artisan test

Verify every controller can be resolved.

---

# Prompt 04 — Repair Authorization Policies

## Objective

Resolve all missing or incomplete authorization policies.

## Scope

Inspect:

- Policies directory
- AuthServiceProvider
- Controllers
- authorize()
- Gate usage

Identify:

- referenced policies that do not exist
- models lacking policies
- permissive policies returning unconditional true
- inconsistent authorization logic

Examples identified during audit include:

- CRM Tasks
- CRM Follow Ups
- Invoice
- Receipt
- Refund
- User

Do not assume these are the only ones.

Inspect the entire repository.

## Requirements

Create missing policies.

Register them correctly.

Replace placeholder authorization with meaningful checks.

Preserve existing permission architecture.

Do not redesign RBAC in this task.

## Acceptance Criteria

Every authorize() call resolves correctly.

No missing policies remain.

Controllers continue functioning.

Authorization failures return appropriate responses.

## Validation

Run

php artisan test

Verify authorization behavior.

---

# Prompt 05 — Repair Route ↔ Frontend Alignment

## Objective

Ensure every backend route correctly maps to an existing frontend page.

## Scope

Inspect:

routes/web.php

every Inertia::render()

every React page

every route helper

Wayfinder usage

Search for:

hardcoded URLs

incorrect page paths

missing React pages

incorrect Inertia paths

route mismatches

## Requirements

Correct:

- incorrect route names
- incorrect Inertia render paths
- broken links
- missing page references
- incorrect Wayfinder usage

Do not redesign navigation.

Do not redesign page layouts.

Only repair alignment.

## Acceptance Criteria

Every route resolves.

Every page renders.

No broken navigation exists.

No 404s caused by incorrect route definitions.

## Validation

Run

php artisan route:list

npm run build

Verify every page loads successfully.


## Part 2 — Security, RBAC & Navigation

---

# Prompt 06 — Consolidate the RBAC Architecture

## Objective

Audit and consolidate the application's Role-Based Access Control (RBAC) implementation into a single, consistent architecture.

The audit identified evidence of two authorization approaches being used simultaneously. This task should determine the intended implementation and remove inconsistencies while preserving existing functionality.

## Scope

Inspect:

- User model
- Role model
- Permission model
- All Policies
- All Middleware
- Database migrations
- Seeders
- Controllers
- Gates
- AuthServiceProvider
- Route middleware

Determine whether the application should use:

- Spatie Laravel Permission
OR
- Custom role/permission implementation

Do not support both simultaneously.

## Requirements

- Remove inconsistent authorization checks.
- Ensure all authorization logic uses the same source.
- Ensure policies use a consistent API.
- Remove dead or unreachable authorization code.
- Ensure User relationships match the selected implementation.
- Verify database schema consistency.

Do NOT redesign permissions beyond what already exists.

## Acceptance Criteria

- One RBAC implementation exists.
- No hybrid authorization logic remains.
- All policies compile.
- All authorization checks execute successfully.

## Validation

Run:

- php artisan test
- php artisan optimize
- php artisan route:list

Produce a summary of the final RBAC architecture.

---

# Prompt 07 — Secure the Admin Area

## Objective

Ensure that administrative functionality is accessible only to authorized administrative users.

## Scope

Inspect:

- routes/web.php
- Middleware
- Route groups
- Policies
- Controllers

Verify:

- admin routes
- nested admin resources
- AJAX endpoints
- settings pages
- reports
- analytics
- imports
- finance
- CRM

## Requirements

Implement consistent authorization for every admin route.

Ensure authentication alone is not sufficient.

Avoid duplicating authorization logic already implemented by policies.

## Acceptance Criteria

- Unauthorized users cannot access admin pages.
- Authorized users retain existing functionality.
- No public route becomes inaccessible.

## Validation

Create or update authorization tests where necessary.

Run:

php artisan test

---

# Prompt 08 — Implement Branch Isolation

## Objective

Implement branch-aware access throughout the application where branch ownership exists.

## Scope

Inspect every model containing:

- branch_id

Inspect:

- Controllers
- Services
- Policies
- Queries
- Reports
- Dashboard widgets
- Filters

Determine whether branch filtering is currently enforced.

## Requirements

Implement branch-aware querying where appropriate.

Users should only access data they are permitted to view.

Avoid hardcoding branch logic.

Reuse existing authorization mechanisms whenever possible.

## Acceptance Criteria

- Branch filtering is consistently enforced.
- No cross-branch data leakage exists.
- Reports respect branch visibility.

## Validation

Create integration tests covering:

- same branch access
- different branch denial

Run:

php artisan test

---

# Prompt 09 — Complete the Policy Audit

## Objective

Review every model and determine whether it requires a dedicated authorization policy.

## Scope

Inspect:

Models

Controllers

authorize()

can()

Gate

Policy mappings

## Requirements

For every model:

Determine:

- requires policy
- policy intentionally unnecessary
- missing policy

Register every required policy.

Remove obsolete registrations.

Ensure naming consistency.

## Acceptance Criteria

Every protected model has an appropriate authorization policy.

No unused policy registrations remain.

No authorization exceptions occur.

## Validation

Run:

php artisan test

---

# Prompt 10 — Repair Navigation Consistency

## Objective

Ensure every implemented module is reachable through the application's navigation.

## Scope

Inspect:

Admin Sidebar

Top Navigation

Breadcrumbs

Command Palette

Quick Actions

Module Cards

Dashboard shortcuts

Search Overlay

Navigation Groups

## Identify

- unreachable modules
- dead links
- duplicate navigation
- incorrect labels
- broken breadcrumbs
- inconsistent hierarchy

## Requirements

Expose every implemented production-ready module.

Remove navigation to unfinished modules only if they are intentionally unavailable.

Preserve existing design language.

## Acceptance Criteria

Every production module is reachable.

No dead navigation remains.

Breadcrumbs accurately represent page hierarchy.

## Validation

Manually verify navigation.

Run:

npm run build

---

# Prompt 11 — Standardize Wayfinder Usage

## Objective

Eliminate inconsistent navigation patterns by standardizing route generation.

## Scope

Inspect:

All React pages

All Links

router.visit()

href usage

Navigation components

Buttons

Dropdown menus

Breadcrumbs

Search results

Command palette

## Requirements

Replace hardcoded application URLs with the project's routing abstraction where appropriate.

Ensure generated routes remain type-safe.

Avoid changing URLs themselves.

Only standardize route generation.

## Acceptance Criteria

No hardcoded internal admin URLs remain unless explicitly justified.

Navigation continues functioning.

## Validation

Run:

npm run build

Verify all navigation.

---

# Prompt 12 — Repair Route Naming Consistency

## Objective

Standardize naming conventions across backend routes, frontend pages and Inertia rendering.

## Scope

Inspect:

routes/web.php

Controllers

resources/js/pages

Wayfinder definitions

Navigation

## Identify

Inconsistent naming such as:

Finance vs Financing

ImportPayments vs Payments

TradeIns vs Trade-Ins

CRM naming inconsistencies

Document naming inconsistencies

## Requirements

Adopt one consistent naming convention.

Update references accordingly.

Avoid breaking URLs unless absolutely necessary.

Maintain backwards compatibility where practical.

## Acceptance Criteria

Naming conventions are consistent across:

Backend

Frontend

Inertia

Navigation

Wayfinder

## Validation

Run:

php artisan route:list

npm run build

php artisan test

---

# Prompt 13 — Repair Broken CRUD Flows

## Objective

Ensure every implemented resource provides a complete and functioning CRUD workflow.

## Scope

Audit every module.

Verify:

Index

Create

Store

Show

Edit

Update

Destroy

Restore (if SoftDeletes are used)

Force Delete (if implemented)

## Identify

Missing pages

Missing routes

Missing controller actions

Missing forms

Broken redirects

Broken validation

## Requirements

Complete incomplete CRUD implementations.

Reuse existing shared components.

Maintain consistent UI.

## Acceptance Criteria

Every production module has a complete CRUD workflow unless intentionally read-only.

## Validation

Run:

php artisan test

Verify CRUD manually where appropriate.

---

# Prompt 14 — Verify Module Completeness

## Objective

Perform a full implementation audit of every business module after remediation.

## Scope

Inspect:

Dashboard

Inventory

Customers

CRM

Reservations

Sales

Payments

Finance

Trade-ins

Imports

CMS

Blog

Marketing

Analytics

Reports

Settings

Users

Roles

Permissions

Branches

Audit Logs

## Requirements

For every module determine:

Backend completeness

Frontend completeness

CRUD completeness

Navigation completeness

Authorization completeness

Integration completeness

Identify remaining implementation gaps.

Do not create new functionality beyond fixing identified deficiencies.

## Acceptance Criteria

Produce an updated completion matrix for every module.

Highlight only genuine remaining gaps.

## Validation

Run:

php artisan test

npm run build

Provide an updated readiness summary.


## Part 3 — Business Logic, Customer Experience & Production Functionality

---

# Prompt 15 — Repair the Reporting Module

## Objective

Audit and repair the reporting system so that every report produces accurate, production-ready data.

The enterprise audit identified schema mismatches, undefined relationships, and incorrect model references that could result in runtime failures or inaccurate reports.

---

## Scope

Inspect:

- ReportController
- ReportService
- Report exports
- Report filters
- Report queries
- Dashboard report widgets
- Chart data providers

Inspect every report type including but not limited to:

- Sales Reports
- Inventory Reports
- Customer Reports
- Reservation Reports
- Financial Reports

---

## Verify

Search for:

- undefined relationships
- invalid columns
- renamed database fields
- incorrect aggregates
- missing eager loading
- missing filters
- incorrect joins
- duplicated SQL

Examples discovered during audit include:

- references to Vehicle.price
- undefined Vehicle.payments()

Do not assume these are the only issues.

---

## Requirements

Repair every report query.

Ensure:

- all referenced relationships exist
- aggregates are correct
- sorting works
- filtering works
- pagination works
- exports match displayed data

Avoid rewriting report architecture.

---

## Acceptance Criteria

- Every report loads successfully.
- No SQL exceptions occur.
- Exported data matches displayed data.
- Charts use correct datasets.

---

## Validation

Run:

- php artisan test
- verify every report page manually

Produce a report listing repaired reports.

---

# Prompt 16 — Replace Mock Public Inventory

## Objective

Replace every mock inventory implementation with real database-driven functionality.

The public inventory should become a true extension of the dealership inventory.

---

## Scope

Inspect:

Public Inventory

Vehicle Listing

Vehicle Detail

Vehicle Search

Featured Vehicles

Latest Vehicles

Search Filters

Related Vehicles

---

## Identify

Search for:

mock

localStorage

sample data

temporary filters

fake pagination

placeholder API responses

fallback datasets

---

## Requirements

Replace mock implementations with:

Laravel Controllers

real database queries

server-side filtering

server-side pagination

real search

real sorting

real featured vehicles

real vehicle availability

Reuse existing VehicleService whenever appropriate.

---

## Acceptance Criteria

Public inventory is fully database-driven.

No mock inventory remains.

Vehicle status reflects live inventory.

---

## Validation

Verify:

search

filters

pagination

sorting

featured vehicles

vehicle details

Run:

php artisan test

npm run build

---

# Prompt 17 — Repair the Customer Portal

## Objective

Transform the customer portal from a prototype into a production-backed application.

---

## Scope

Inspect every customer page.

Examples include:

Wishlist

Saved Searches

Reservations

Profile

Notifications

Orders

Documents

Account Settings

---

## Identify

Search for:

mock

localStorage

placeholder

fake data

temporary state

hardcoded customer information

---

## Requirements

Connect every customer feature to Laravel.

Persist all customer actions in the database.

Ensure authenticated users access only their own data.

Reuse existing services where possible.

---

## Acceptance Criteria

Every customer feature is backed by the database.

No customer functionality depends on localStorage for persistence.

Authorization is enforced.

---

## Validation

Verify every customer workflow.

Run:

php artisan test

npm run build

---

# Prompt 18 — Connect CMS to the Public Website

## Objective

Ensure the public-facing website is driven entirely by CMS-managed content.

---

## Scope

Inspect:

Pages

Blog

News

Announcements

Media

FAQs

Promotions

SEO metadata

Landing pages

---

## Requirements

Replace static content with CMS-driven content.

Ensure:

published filtering

draft support

scheduled publishing

SEO metadata

media loading

category filtering

author information

---

## Acceptance Criteria

Public content originates from CMS records.

No hardcoded marketing content remains.

---

## Validation

Verify every public page.

Run:

php artisan test

---

# Prompt 19 — Repair Sales Workflow

## Objective

Verify the entire dealership sales workflow from reservation through completion.

---

## Scope

Inspect:

Reservations

Sales

Invoices

Receipts

Refunds

Payments

Vehicle status updates

Customer ownership

---

## Verify

Ensure workflows correctly transition between states.

Examples:

Available

Reserved

Sold

Delivered

Cancelled

Returned

Archived

---

## Requirements

Repair broken transitions.

Repair missing controller actions.

Repair missing frontend pages.

Repair missing validation.

Ensure every workflow is transactional where appropriate.

---

## Acceptance Criteria

Complete sales workflow executes successfully.

Vehicle inventory remains accurate.

Customer ownership updates correctly.

---

## Validation

Execute end-to-end sales scenarios.

Run:

php artisan test

---

# Prompt 20 — Repair Trade-In Workflow

## Objective

Complete the trade-in management process.

---

## Scope

Inspect:

Trade-In Requests

Vehicle Valuations

Inspections

Offers

Approvals

Trade-In Status

Inventory Conversion

---

## Requirements

Repair:

missing pages

broken routes

broken controller actions

status transitions

relationships

approval workflow

Reuse shared UI components.

---

## Acceptance Criteria

Trade-in lifecycle functions correctly.

All implemented routes resolve.

Navigation is complete.

---

## Validation

Run:

php artisan test

Verify complete trade-in lifecycle.

---

# Prompt 21 — Repair Import Management

## Objective

Complete and validate the inventory import workflow.

---

## Scope

Inspect:

Imports

Shipments

Import Payments

Import Documents

Import Status

Supplier Relationships

Vehicle Assignment

---

## Requirements

Repair:

route mismatches

frontend paths

missing CRUD pages

document uploads

status updates

payment relationships

Ensure imports correctly populate inventory.

---

## Acceptance Criteria

Entire import workflow functions correctly.

Navigation is consistent.

No broken links remain.

---

## Validation

Run:

php artisan test

Verify complete import lifecycle.

---

# Prompt 22 — Complete Finance Module

## Objective

Complete all finance-related workflows.

---

## Scope

Inspect:

Finance

Financing

Payment Plans

Loan Documents

Approvals

Schedules

Financial Records

---

## Verify

Identify:

missing pages

missing routes

incorrect page names

missing CRUD

broken relationships

schema mismatches

---

## Requirements

Repair every identified issue.

Standardize Finance naming throughout the project.

Preserve existing database schema.

---

## Acceptance Criteria

Finance module operates consistently.

All routes resolve correctly.

CRUD workflows are complete.

---

## Validation

Run:

php artisan test

Verify every finance workflow.

---

# Prompt 23 — Complete Analytics Module

## Objective

Transform the analytics module from scaffolded functionality into a production-ready reporting dashboard.

---

## Scope

Inspect:

Analytics Controllers

Analytics Services

Dashboard Widgets

Charts

Metrics

Trend Analysis

KPIs

---

## Requirements

Replace placeholder calculations.

Generate real metrics from production data.

Optimize expensive queries.

Ensure charts accurately represent backend data.

---

## Acceptance Criteria

Analytics reflect live dealership information.

Charts load correctly.

No placeholder metrics remain.

---

## Validation

Run:

php artisan test

Verify dashboard metrics manually.

---

# Prompt 24 — Complete Public Website Integration

## Objective

Ensure every public-facing page uses real backend data.

---

## Scope

Inspect:

Homepage

Vehicle Listings

Vehicle Details

Blog

News

Promotions

Search

Contact

Reservation

Finance Calculator

Testimonials

---

## Requirements

Replace:

placeholder content

mock data

temporary APIs

fake counters

static listings

Ensure every page loads live information.

---

## Acceptance Criteria

Entire public website is production-backed.

No mock content remains.

---

## Validation

Run:

php artisan test

npm run build

Verify every public page manually.

# ENTERPRISE REMEDIATION ROADMAP
## Part 4 — Enterprise Operations, Performance & Production Hardening

---

# Prompt 25 — Implement Events, Listeners and Domain Events

## Objective

Audit and complete the application's event-driven architecture.

The audit identified multiple Events and Listeners that exist but are never dispatched.

Convert decorative infrastructure into production-ready functionality.

---

## Scope

Inspect:

- app/Events
- app/Listeners
- EventServiceProvider
- Controllers
- Services
- Jobs

Search for:

event(

dispatch(

Event::dispatch

implements ShouldBroadcast

Listener registrations

---

## Verify

Determine:

- orphaned events
- undispatched events
- unused listeners
- duplicate events
- events that should be synchronous
- events that should be asynchronous

---

## Requirements

Wire every production event into the appropriate business workflow.

Examples include:

- Vehicle Created
- Vehicle Updated
- Reservation Created
- Reservation Cancelled
- Sale Completed
- Customer Registered
- Payment Received
- Trade-In Approved
- Import Completed

Reuse existing Events wherever possible.

Do NOT introduce unnecessary events.

---

## Acceptance Criteria

Every production event is dispatched.

Every listener executes successfully.

No unused event infrastructure remains.

---

## Validation

Run:

- php artisan event:list
- php artisan test

Produce a summary of all active events.

---

# Prompt 26 — Complete Queue & Background Processing

## Objective

Identify operations that should execute asynchronously and implement a production-ready queue strategy.

---

## Scope

Inspect:

Jobs

Notifications

Mailables

Media Processing

Imports

Reports

Image Processing

Audit Logging

---

## Verify

Determine whether each task should execute:

- synchronously
- asynchronously

---

## Requirements

Move expensive operations into queues where appropriate.

Examples:

- report generation
- email notifications
- media optimization
- import processing
- audit logging
- thumbnail generation

Avoid queueing lightweight CRUD operations.

---

## Acceptance Criteria

Heavy operations no longer block user requests.

Failed jobs are recoverable.

Queue configuration follows Laravel best practices.

---

## Validation

Run:

php artisan queue:work

php artisan test

---

# Prompt 27 — Complete Audit Logging

## Objective

Implement a reliable audit trail for all significant business operations.

The audit identified audit logging infrastructure that is not fully wired.

---

## Scope

Inspect:

Audit Logs

Listeners

Observers

Events

Services

Authentication

Settings

Users

Inventory

Sales

CRM

Finance

---

## Determine

Which actions should generate audit entries.

Examples:

- login
- logout
- create
- update
- delete
- approve
- reject
- import
- export
- permission changes

---

## Requirements

Wire audit logging into business events.

Ensure logs capture:

- user
- timestamp
- action
- affected model
- previous values where appropriate
- new values where appropriate

Avoid logging sensitive information.

---

## Acceptance Criteria

Critical business actions are auditable.

Audit logs are searchable.

No duplicate audit entries occur.

---

## Validation

Run:

php artisan test

Verify audit entries manually.

---

# Prompt 28 — Complete Notification System

## Objective

Implement production-ready notifications throughout the application.

---

## Scope

Inspect:

Notifications

Mailables

Reservation workflow

Sales workflow

Finance workflow

CRM

Customers

Imports

Marketing

---

## Requirements

Replace placeholder notifications.

Ensure meaningful notification content.

Determine notification channels:

- database
- email
- broadcast

Reuse existing notification infrastructure.

---

## Acceptance Criteria

Notifications are generated for important business events.

Notification content is accurate.

No placeholder messages remain.

---

## Validation

Run:

php artisan test

Verify notification delivery.

---

# Prompt 29 — Performance Optimization

## Objective

Perform a comprehensive performance optimization pass.

---

## Scope

Inspect:

Controllers

Services

Repositories

Queries

Dashboard

Reports

Charts

Frontend Components

Tables

Images

---

## Search for

N+1 queries

Missing eager loading

Duplicate queries

Large components

Repeated calculations

Expensive loops

Unnecessary rendering

---

## Requirements

Implement:

Eager loading

Query optimization

Pagination improvements

Caching where appropriate

Component lazy loading

Image optimization

Avoid premature optimization.

Only optimize verified bottlenecks.

---

## Acceptance Criteria

Reduced query count.

Improved page responsiveness.

Large datasets remain performant.

---

## Validation

Profile:

Dashboard

Inventory

Reports

Customers

Analytics

Run:

php artisan test

npm run build

---

# Prompt 30 — Standardize Loading, Empty & Error States

## Objective

Apply a consistent UX pattern across the entire application.

---

## Scope

Inspect every page.

Verify:

Loading

Empty

Error

Skeleton

Inline validation

Dialogs

Toast notifications

---

## Requirements

Adopt the project's shared UI components.

Remove inconsistent implementations.

Ensure accessibility.

---

## Acceptance Criteria

Every page follows the same interaction pattern.

No missing loading states remain.

Empty states are meaningful.

Errors are user-friendly.

---

## Validation

Review every module.

Run:

npm run build

---

# Prompt 31 — Accessibility & Responsive Design Audit

## Objective

Improve accessibility and responsiveness across the application.

---

## Scope

Inspect:

Forms

Tables

Dialogs

Navigation

Buttons

Icons

Charts

Modals

Menus

Cards

---

## Verify

Keyboard navigation

Focus management

ARIA labels

Color contrast

Responsive layouts

Touch usability

Screen reader compatibility

---

## Requirements

Fix verified accessibility issues.

Preserve existing design language.

---

## Acceptance Criteria

Core workflows meet modern accessibility expectations.

Responsive layouts function across supported devices.

---

## Validation

Review all primary workflows manually.

Run:

npm run build

---

# Prompt 32 — Code Quality & Technical Debt Reduction

## Objective

Reduce accumulated technical debt without altering application behavior.

---

## Scope

Inspect:

Controllers

Services

Traits

Helpers

Components

Hooks

Utilities

Layouts

Actions

---

## Search for

Dead code

Unused imports

Unused classes

Duplicate logic

Large methods

Repeated validation

Repeated UI

Repeated helpers

---

## Requirements

Refactor only where duplication is verified.

Remove obsolete scaffolding.

Improve maintainability.

Preserve public APIs.

---

## Acceptance Criteria

Reduced duplication.

Improved maintainability.

No behavioral regressions.

---

## Validation

Run:

php artisan test

npm run build

Static analysis

---

# Prompt 33 — Expand Automated Test Coverage

## Objective

Increase confidence in production readiness by expanding automated test coverage.

---

## Scope

Review existing tests.

Identify critical workflows lacking coverage.

Examples:

Authentication

Authorization

Inventory

CRM

Customers

Reservations

Sales

Finance

Imports

Trade-ins

Reports

Audit Logs

---

## Requirements

Add:

Feature Tests

Integration Tests

Policy Tests

Authorization Tests

Workflow Tests

Regression Tests

Avoid brittle implementation-specific tests.

---

## Acceptance Criteria

Critical business workflows are covered.

Regression risk is reduced.

Tests remain maintainable.

---

## Validation

Run:

php artisan test

Document overall coverage improvements.

---

# Prompt 34 — Production Configuration & Deployment Hardening

## Objective

Prepare the application for production deployment.

---

## Scope

Review:

Environment configuration

Caching

Config cache

Route cache

View cache

Queues

Scheduler

Storage

Logging

Sessions

Mail

Backups

Error handling

Maintenance mode

---

## Verify

Production readiness.

Identify missing operational configuration.

---

## Requirements

Ensure:

secure defaults

optimized configuration

appropriate logging

proper cache usage

queue readiness

scheduler readiness

storage configuration

Do not deploy.

Only prepare the repository for deployment.

---

## Acceptance Criteria

Application follows Laravel production best practices.

No known operational blockers remain.

---

## Validation

Run:

php artisan optimize

php artisan test

npm run build

Prepare a deployment readiness summary.

# ENTERPRISE REMEDIATION ROADMAP
## Part 4 — Enterprise Operations, Performance & Production Hardening

---

# Prompt 25 — Implement Events, Listeners and Domain Events

## Objective

Audit and complete the application's event-driven architecture.

The audit identified multiple Events and Listeners that exist but are never dispatched.

Convert decorative infrastructure into production-ready functionality.

---

## Scope

Inspect:

- app/Events
- app/Listeners
- EventServiceProvider
- Controllers
- Services
- Jobs

Search for:

event(

dispatch(

Event::dispatch

implements ShouldBroadcast

Listener registrations

---

## Verify

Determine:

- orphaned events
- undispatched events
- unused listeners
- duplicate events
- events that should be synchronous
- events that should be asynchronous

---

## Requirements

Wire every production event into the appropriate business workflow.

Examples include:

- Vehicle Created
- Vehicle Updated
- Reservation Created
- Reservation Cancelled
- Sale Completed
- Customer Registered
- Payment Received
- Trade-In Approved
- Import Completed

Reuse existing Events wherever possible.

Do NOT introduce unnecessary events.

---

## Acceptance Criteria

Every production event is dispatched.

Every listener executes successfully.

No unused event infrastructure remains.

---

## Validation

Run:

- php artisan event:list
- php artisan test

Produce a summary of all active events.

---

# Prompt 26 — Complete Queue & Background Processing

## Objective

Identify operations that should execute asynchronously and implement a production-ready queue strategy.

---

## Scope

Inspect:

Jobs

Notifications

Mailables

Media Processing

Imports

Reports

Image Processing

Audit Logging

---

## Verify

Determine whether each task should execute:

- synchronously
- asynchronously

---

## Requirements

Move expensive operations into queues where appropriate.

Examples:

- report generation
- email notifications
- media optimization
- import processing
- audit logging
- thumbnail generation

Avoid queueing lightweight CRUD operations.

---

## Acceptance Criteria

Heavy operations no longer block user requests.

Failed jobs are recoverable.

Queue configuration follows Laravel best practices.

---

## Validation

Run:

php artisan queue:work

php artisan test

---

# Prompt 27 — Complete Audit Logging

## Objective

Implement a reliable audit trail for all significant business operations.

The audit identified audit logging infrastructure that is not fully wired.

---

## Scope

Inspect:

Audit Logs

Listeners

Observers

Events

Services

Authentication

Settings

Users

Inventory

Sales

CRM

Finance

---

## Determine

Which actions should generate audit entries.

Examples:

- login
- logout
- create
- update
- delete
- approve
- reject
- import
- export
- permission changes

---

## Requirements

Wire audit logging into business events.

Ensure logs capture:

- user
- timestamp
- action
- affected model
- previous values where appropriate
- new values where appropriate

Avoid logging sensitive information.

---

## Acceptance Criteria

Critical business actions are auditable.

Audit logs are searchable.

No duplicate audit entries occur.

---

## Validation

Run:

php artisan test

Verify audit entries manually.

---

# Prompt 28 — Complete Notification System

## Objective

Implement production-ready notifications throughout the application.

---

## Scope

Inspect:

Notifications

Mailables

Reservation workflow

Sales workflow

Finance workflow

CRM

Customers

Imports

Marketing

---

## Requirements

Replace placeholder notifications.

Ensure meaningful notification content.

Determine notification channels:

- database
- email
- broadcast

Reuse existing notification infrastructure.

---

## Acceptance Criteria

Notifications are generated for important business events.

Notification content is accurate.

No placeholder messages remain.

---

## Validation

Run:

php artisan test

Verify notification delivery.

---

# Prompt 29 — Performance Optimization

## Objective

Perform a comprehensive performance optimization pass.

---

## Scope

Inspect:

Controllers

Services

Repositories

Queries

Dashboard

Reports

Charts

Frontend Components

Tables

Images

---

## Search for

N+1 queries

Missing eager loading

Duplicate queries

Large components

Repeated calculations

Expensive loops

Unnecessary rendering

---

## Requirements

Implement:

Eager loading

Query optimization

Pagination improvements

Caching where appropriate

Component lazy loading

Image optimization

Avoid premature optimization.

Only optimize verified bottlenecks.

---

## Acceptance Criteria

Reduced query count.

Improved page responsiveness.

Large datasets remain performant.

---

## Validation

Profile:

Dashboard

Inventory

Reports

Customers

Analytics

Run:

php artisan test

npm run build

---

# Prompt 30 — Standardize Loading, Empty & Error States

## Objective

Apply a consistent UX pattern across the entire application.

---

## Scope

Inspect every page.

Verify:

Loading

Empty

Error

Skeleton

Inline validation

Dialogs

Toast notifications

---

## Requirements

Adopt the project's shared UI components.

Remove inconsistent implementations.

Ensure accessibility.

---

## Acceptance Criteria

Every page follows the same interaction pattern.

No missing loading states remain.

Empty states are meaningful.

Errors are user-friendly.

---

## Validation

Review every module.

Run:

npm run build

---

# Prompt 31 — Accessibility & Responsive Design Audit

## Objective

Improve accessibility and responsiveness across the application.

---

## Scope

Inspect:

Forms

Tables

Dialogs

Navigation

Buttons

Icons

Charts

Modals

Menus

Cards

---

## Verify

Keyboard navigation

Focus management

ARIA labels

Color contrast

Responsive layouts

Touch usability

Screen reader compatibility

---

## Requirements

Fix verified accessibility issues.

Preserve existing design language.

---

## Acceptance Criteria

Core workflows meet modern accessibility expectations.

Responsive layouts function across supported devices.

---

## Validation

Review all primary workflows manually.

Run:

npm run build

---

# Prompt 32 — Code Quality & Technical Debt Reduction

## Objective

Reduce accumulated technical debt without altering application behavior.

---

## Scope

Inspect:

Controllers

Services

Traits

Helpers

Components

Hooks

Utilities

Layouts

Actions

---

## Search for

Dead code

Unused imports

Unused classes

Duplicate logic

Large methods

Repeated validation

Repeated UI

Repeated helpers

---

## Requirements

Refactor only where duplication is verified.

Remove obsolete scaffolding.

Improve maintainability.

Preserve public APIs.

---

## Acceptance Criteria

Reduced duplication.

Improved maintainability.

No behavioral regressions.

---

## Validation

Run:

php artisan test

npm run build

Static analysis

---

# Prompt 33 — Expand Automated Test Coverage

## Objective

Increase confidence in production readiness by expanding automated test coverage.

---

## Scope

Review existing tests.

Identify critical workflows lacking coverage.

Examples:

Authentication

Authorization

Inventory

CRM

Customers

Reservations

Sales

Finance

Imports

Trade-ins

Reports

Audit Logs

---

## Requirements

Add:

Feature Tests

Integration Tests

Policy Tests

Authorization Tests

Workflow Tests

Regression Tests

Avoid brittle implementation-specific tests.

---

## Acceptance Criteria

Critical business workflows are covered.

Regression risk is reduced.

Tests remain maintainable.

---

## Validation

Run:

php artisan test

Document overall coverage improvements.

---

# Prompt 34 — Production Configuration & Deployment Hardening

## Objective

Prepare the application for production deployment.

---

## Scope

Review:

Environment configuration

Caching

Config cache

Route cache

View cache

Queues

Scheduler

Storage

Logging

Sessions

Mail

Backups

Error handling

Maintenance mode

---

## Verify

Production readiness.

Identify missing operational configuration.

---

## Requirements

Ensure:

secure defaults

optimized configuration

appropriate logging

proper cache usage

queue readiness

scheduler readiness

storage configuration

Do not deploy.

Only prepare the repository for deployment.

---

## Acceptance Criteria

Application follows Laravel production best practices.

No known operational blockers remain.

---

## Validation

Run:

php artisan optimize

php artisan test

npm run build

Prepare a deployment readiness summary.
