# Specification

## Summary
**Goal:** Repurpose the existing site into “Smartwatch Data Hub,” a smartwatch data import, storage, and analytics web app with all UI text in English.

**Planned changes:**
- Replace the construction single-page UI/branding and gallery with new app navigation and screens for Import, Dashboard, Datasets/Records, and Export.
- Implement an in-browser import flow for CSV/JSON uploads with file-type/malformed-content validation, record parsing, and a preview table before saving.
- Add per-user (Internet Identity Principal) backend storage for datasets (metadata + records) with create/list/fetch/delete and stable persistence.
- Define an extensible smartwatch record model (timestamp required; optional common metrics like steps/heartRate/calories/distance/sleep; plus additional key/value fields) and map imported fields with unmapped-field flags.
- Build a dashboard that computes derived metrics (e.g., totals/averages/min/max) with date-range filtering and graceful handling of missing metrics.
- Add dataset management UI to list datasets, view dataset details (summary + records table/preview), and delete with confirmation.
- Add browser-based export to download a normalized/extended dataset JSON including metadata (and derived fields if computed).
- Apply a consistent health/fitness visual theme across all screens and reference new generated images as static assets from `frontend/public/assets/generated`.

**User-visible outcome:** Users can sign in, upload smartwatch CSV/JSON exports, preview and save datasets, view/manage saved datasets, see derived health metrics with date filtering, and export normalized data to a JSON file.
