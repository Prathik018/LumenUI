---
description: How to remove a component from the library
---

To remove a component from the LumenUI library, follow these steps:

1.  **Identify the Component Slug**: Find the `slug` of the component you want to remove (e.g., `slide-text-button`).

2.  **Remove from Registry**:
    - Open `lib/components.ts`.
    - Find the object in `componentsList` that matches the component's slug.
    - Delete that line/object.

3.  **Delete the Component File**:
    - Navigate to `components/lumenui/`.
    - Delete the file named `[slug].tsx` (e.g., `slide-text-button.tsx`).

4.  **Clean up Usage (Optional)**:
    - Search the codebase for any imports of this component (e.g., in `app/page.tsx` or other pages) and remove them to prevent build errors.
