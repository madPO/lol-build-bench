# Data Model: Style Switcher

## Client-Side Entities

### `ThemePreference` (Local State)

This entity represents the user's selected visual style. It is persisted entirely on the client side (LocalStorage) and drives the global `data-theme` attribute on the DOM.

**Type/Shape:**
```typescript
type ThemePreference = "original" | "chiaroscuro";
```

**Fields/Attributes:**
*   `value` (ThemePreference): The active theme string.

**Validation Rules:**
*   Must strictly equal `"original"` or `"chiaroscuro"`.
*   If absent, malformed, or unreadable, the system MUST default to `"original"`.

**State Transitions:**
1.  `"original"` → User toggles theme → `"chiaroscuro"`
2.  `"chiaroscuro"` → User toggles theme → `"original"`

**Storage Mechanism:**
*   Key: `lolbench_theme_preference`
*   Location: Browser `window.localStorage`
