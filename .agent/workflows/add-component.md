---
description: How to add a new component to the library
---

To add a new component to the LumenUI library, follow these steps:

1.  **Create the Component File**:
    - Create a new `.tsx` file in the `components/lumenui/` directory.
    - The filename should be the kebab-case version of your component name (e.g., `my-new-component.tsx`).
    - Ensure the component is the **default export** of the file.

    ```tsx
    // components/lumenui/my-new-component.tsx
    import React from 'react';

    const MyNewComponent = () => {
      return <div>Hello World</div>;
    };

    export default MyNewComponent;
    ```

2.  **Register the Component**:
    - Open `lib/components.ts`.
    - Add a new object to the `componentsList` array.
    - Ensure the `slug` property matches the filename you created in step 1 (without the `.tsx` extension).

    ```typescript
    // lib/components.ts
    export const componentsList: Component[] = [
        // ... existing components
        { name: "My New Component", slug: "my-new-component", category: "My Category" },
    ];
    ```

3.  **Verify**:
    - The component will automatically appear in the components sidebar.
    - Navigating to `/docs/components/my-new-component` will show the live preview and the source code.
