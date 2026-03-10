# LedgerAxis Product Roadmap

This roadmap prioritizes features by business value, daily user utility, implementation risk, and how strongly each item improves product stickiness for compliance, corporate governance, and due diligence workflows.

## Product Goal

LedgerAxis should evolve from a tenant-scoped company directory into a workflow tool for compliance analysts, governance teams, and corporate researchers.

That means prioritizing features that help users:

- monitor the companies they care about repeatedly
- detect cross-company director relationships quickly
- export findings into real reporting workflows
- trust the data through history, provenance, and controlled access

## Prioritization Principles

Features are prioritized using these rules:

1. Daily workflow value beats dashboard novelty.
2. Features that increase retention beat one-off analysis features.
3. Features that improve trust and governance are critical for B2B adoption.
4. Structural platform improvements should happen before complexity multiplies.
5. Visualization work should support decision-making, not just aesthetics.

## Phase 1: Immediate Priority

### 1. Watchlist and Notes

**Why now**

This is the strongest day-to-day workflow feature. Users need a way to save important companies, organize ongoing review, and avoid repeated searching.

**User value**

- track companies across sessions
- keep a short list for weekly review
- attach analyst notes to flagged entities
- create a repeatable working set for compliance checks

**Suggested scope**

- personal watchlist per user
- add/remove company from watchlist
- optional notes field
- watchlist page or panel
- recent viewed companies as a lightweight companion feature

**Backend impact**

- new `watchlists` table
- optionally `watchlist_notes` or a note column
- user-scoped persistence in the database

**Priority rationale**

Highest ROI and lowest conceptual risk.

### 2. Director Profile Page

**Why now**

Directors are currently trapped inside company pages. Users cannot yet pivot from a person to all related companies, which limits investigative value.

**User value**

- review all companies linked to a director
- identify repeated affiliations
- support cross-entity review without re-searching manually

**Suggested scope**

- `GET /api/directors/:id`
- `GET /api/directors/:id/companies`
- new director detail page
- linked navigation from company detail

**Priority rationale**

Builds directly on existing company-director relationships and unlocks cross-company analysis before adding more complex visualizations.

### 3. Export CSV and PDF

**Why now**

Analysts, compliance teams, and management reporting workflows depend on exportability. Without it, the platform is informative but not operationally useful.

**User value**

- export company lists for Excel workflows
- export company profiles for management packs
- export director data for manual review or audit trails

**Suggested scope**

- CSV export for company search results
- CSV export for analytics tables
- PDF export for company detail page

**Priority rationale**

High business value with straightforward implementation.

## Phase 2: Core Product Strengthening

### 4. Advanced Search Filters

**Why next**

The current search is good for lookup, but not for screening. Power users need structured filtering for analysis.

**Suggested filters**

- industry
- revenue range
- employee count range
- director count
- creation date or update date if available later

**User value**

- identify cohorts of interest quickly
- reduce manual report building
- support governance and due diligence workflows

### 5. Change History and Audit Trail

**Why next**

As soon as records can be updated more frequently, trust becomes a product feature. Users need to know what changed, when, and by whom.

**Suggested scope**

- `updated_at` on mutable entities
- audit log table
- per-company history view
- minimal before/after diff representation

**User value**

- trust in record integrity
- analyst accountability
- easier compliance review

### 6. Role-Based Access Control

**Why next**

Larger clients will require clearer separation between viewers, editors, and admins.

**Suggested roles**

- viewer
- analyst/editor
- admin

**User value**

- safer collaboration
- better enterprise readiness
- easier procurement conversations with larger organizations

## Phase 3: Monitoring and Relationship Intelligence

### 7. Notifications and Alerts

**Why later**

Alerting becomes powerful once watchlists and audit trails exist. Without those foundations, notifications are less actionable.

**Suggested scope**

- notify on watched company changes
- notify on newly linked directors
- optional email or in-app activity feed

### 8. Director Network Graph

**Why later, but strategic**

This is the clearest differentiator, but it should be built on top of stronger relationship navigation first.

**User value**

- visualize board overlap
- identify connected entities quickly
- support related-party risk review
- expose shell or proxy relationship patterns

**Suggested scope**

- company-to-director graph view
- director-to-company neighborhood expansion
- limit graph by depth to keep it usable
- add focus mode for one company or one director

**Visualization note**

This is a product feature, not just a chart. It should be designed as an analysis tool with filtering and drill-down, not a decorative network diagram.

## Phase 4: Premium and Differentiation Features

### 9. Director Overlap Heatmap

**User value**

- identify directors shared across the highest number of companies
- support governance concentration analysis
- produce stronger oversight reporting

### 10. Bulk CSV Import

**User value**

- reduce onboarding friction for enterprise tenants
- support migration from spreadsheets
- improve adoption speed for large clients

### 11. Aggregated Cross-Tenant Signals

**Strategic note**

This may become a premium feature if implemented safely. The value is not raw data exposure, but aggregated risk signaling.

**Potential examples**

- a director appears across many tenants
- a company is frequently flagged
- certain industries show anomalous director overlap patterns

**Important constraint**

No raw tenant data leakage. Aggregation and privacy boundaries must be designed explicitly.

## Supporting Engineering Work

These are not headline product features, but they should be handled early because they reduce future risk.

### A. Refactor Vague Analytics Endpoints

`/api/analytics/advanced-queries` should be split into intentional endpoints before frontend usage expands further.

### B. Enforce Tenant Scoping Structurally

Tenant filtering should remain guaranteed at the service/repository layer, ideally through a tenant-aware query abstraction or repository pattern.

### C. Data Sensitivity Review

Director birth year may require role-based masking or compliance review depending on jurisdiction and client expectations.

### D. Product-Facing Documentation

The README is still primarily technical. A one-page product brief should be created later for stakeholder conversations, with emphasis on governance, compliance, due diligence, and monitoring workflows.

## Recommended Execution Order

If implemented one item at a time, the recommended order is:

1. Watchlist and notes
2. Director profile page
3. Export CSV/PDF
4. Advanced search filters
5. Change history and audit trail
6. Role-based access control
7. Notifications and alerts
8. Director network graph
9. Director overlap heatmap
10. Bulk CSV import
11. Aggregated cross-tenant signals

## What Would Likely Drive Daily Usage

The strongest daily-use loop is:

- save companies to watchlist
- review updates or notes
- inspect director affiliations when something looks suspicious
- export findings for reporting

That means the most important product loop is not analytics-first. It is monitoring-first.

## What Would Likely Impress Stakeholders

The strongest stakeholder narrative is:

- LedgerAxis centralizes tenant-safe company and director intelligence
- it helps analysts move from lookup to monitoring
- it adds governance insight through relationship analysis
- it supports reporting and compliance workflows without exposing cross-tenant raw data
