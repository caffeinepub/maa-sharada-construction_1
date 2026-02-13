# Specification

## Summary
**Goal:** Add a Project Gallery section to the Maa Sharada Construction single-page website to showcase completed projects with a responsive grid and in-page image preview.

**Planned changes:**
- Add a new “Project Gallery” section on the homepage (with a stable section id such as `gallery`), placed between Services and Contact (or another clearly intentional location).
- Display at least 6 project images in a responsive photo grid with fixed aspect-ratio containers, object-fit styling, and meaningful alt text.
- Enable clicking/tapping a gallery image to open a larger in-page preview (modal/dialog) with close control and ESC-to-close behavior.
- Update header navigation and footer “Quick Links” to include smooth-scroll navigation to the Project Gallery section (including closing the mobile menu after selection and preserving scroll offset behavior under the sticky header).
- Match existing site theme for spacing, typography, card styles, and hover states while avoiding regressions to current sections.

**User-visible outcome:** Visitors can scroll to a new Project Gallery section from the header/footer links, browse a responsive grid of project photos, and open any image in a larger in-page preview that can be closed via a button or ESC.
