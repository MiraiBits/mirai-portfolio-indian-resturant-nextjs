## 2024-05-22 - Non-semantic Interactive Elements
**Learning:** The application uses `div` elements with `onClick` handlers for interactive lists (like menu items) instead of semantic `<button>` elements or anchors. This breaks keyboard accessibility and screen reader support.
**Action:** When encountering this pattern, wrap the content in a `<button>` or add `role="button"`, `tabIndex="0"`, and `onKeyDown` handlers. Ensure `cursor: pointer` is applied only to truly interactive elements.

## 2026-02-06 - Custom Modal Accessibility
**Learning:** Custom modals implemented with simple `div` overlays often miss critical accessibility features like `role="dialog"`, `aria-modal="true"`, focus management, and keyboard support (Escape key).
**Action:** Always add ARIA roles to custom modals and ensure they handle the Escape key and manage focus state (trapping focus or restoring it) to support keyboard users.
