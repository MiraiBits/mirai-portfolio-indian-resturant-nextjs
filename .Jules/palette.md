## 2024-05-22 - Non-semantic Interactive Elements
**Learning:** The application uses `div` elements with `onClick` handlers for interactive lists (like menu items) instead of semantic `<button>` elements or anchors. This breaks keyboard accessibility and screen reader support.
**Action:** When encountering this pattern, wrap the content in a `<button>` or add `role="button"`, `tabIndex="0"`, and `onKeyDown` handlers. Ensure `cursor: pointer` is applied only to truly interactive elements.

## 2025-05-23 - Inaccessible Visual Indicators
**Learning:** Visual status indicators (like spice level emojis or V/NV badges) lacked text alternatives, making them invisible to screen readers.
**Action:** Always add `aria-label` or visually hidden text to status icons.
