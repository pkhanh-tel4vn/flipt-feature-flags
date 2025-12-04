# Resource Component Usage Guide

The Resource component automatically extracts resources (logo, CSS) from Flipt feature flags and makes them available throughout your application.

## Setup

The Resource component is already set up in your `app/layout.tsx`:

```tsx
<FeatureFlag>
  <Resource>{/* Your app */}</Resource>
</FeatureFlag>
```

## Features

1. **Automatic CSS Loading**: CSS from `cssUrl` is automatically injected into the document head
2. **Resource Context**: Resources are available via React Context throughout your app
3. **Type Safety**: Full TypeScript support

## Usage Examples

### 1. Using the Logo Component

The easiest way to display the logo:

```tsx
"use client";

import Logo from "@/components/Resource/Logo";

export default function MyComponent() {
  return (
    <div>
      <Logo
        alt="Company Logo"
        width={150}
        height={50}
        className="my-logo-class"
      />
    </div>
  );
}
```

**Props:**

- `alt?: string` - Alt text for the image (default: "Logo")
- `width?: number` - Image width (default: 100)
- `height?: number` - Image height (default: 100)
- `className?: string` - Additional CSS classes
- `fallback?: React.ReactNode` - Content to show if no logo is available

### 2. Using the useResource Hook

Access resources directly in any client component:

```tsx
"use client";

import { useResource } from "@/components/Resource/useResource";

export default function MyComponent() {
  const resources = useResource();

  return (
    <div>
      {resources?.logo && <img src={resources.logo} alt="Logo" />}
      {resources?.cssUrl && <p>CSS loaded from: {resources.cssUrl}</p>}
    </div>
  );
}
```

**Return Value:**

```typescript
{
  logo?: string;      // Logo URL from feature flags
  cssUrl?: string;     // CSS URL from feature flags
} | null
```

### 3. Custom Logo with Fallback

```tsx
"use client";

import Logo from "@/components/Resource/Logo";

export default function Header() {
  return (
    <header>
      <Logo
        alt="Company Logo"
        width={120}
        height={40}
        fallback={<span>Default Logo</span>}
      />
    </header>
  );
}
```

## Feature Flag Configuration

In your Flipt feature flag configuration, set the `tenant-resource` flag with attachments:

```json
{
  "logo": "https://example.com/logo.png",
  "cssUrl": "https://example.com/styles.css"
}
```

The Resource component will:

- Automatically load the CSS from `cssUrl` into the document head
- Make both `logo` and `cssUrl` available via the `useResource` hook
- Provide a ready-to-use `Logo` component

## Notes

- CSS is automatically injected and removed when the component unmounts or the URL changes
- Resources are only available in client components (components with `"use client"`)
- The Resource component must be inside the `FeatureFlag` provider
- If resources are not available, the Logo component returns `null` (or the fallback if provided)
