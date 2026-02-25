## 2024-05-22 - Non-semantic Interactive Elements
**Learning:** The application uses `div` elements with `onClick` handlers for interactive lists (like menu items) instead of semantic `<button>` elements or anchors. This breaks keyboard accessibility and screen reader support.
**Action:** When encountering this pattern, wrap the content in a `<button>` or add `role="button"`, `tabIndex="0"`, and `onKeyDown` handlers. Ensure `cursor: pointer` is applied only to truly interactive elements.

## 2026-02-06 - Custom Modal Accessibility
**Learning:** Custom modals implemented with simple `div` overlays often miss critical accessibility features like `role="dialog"`, `aria-modal="true"`, focus management, and keyboard support (Escape key).
**Action:** Always add ARIA roles to custom modals and ensure they handle the Escape key and manage focus state (trapping focus or restoring it) to support keyboard users.
## 2025-05-23 - Inaccessible Visual Indicators
**Learning:** Visual status indicators (like spice level emojis or V/NV badges) lacked text alternatives, making them invisible to screen readers.
**Action:** Always add `aria-label` or visually hidden text to status icons.
## 2024-12-12 - Interactive Form Feedback
**Learning:** Standard HTML forms are used without client-side feedback (loading, success), causing a "dead" feel on submission.
**Action:** Convert form pages to Client Components (or use wrapper components) to manage submission state, providing immediate visual feedback (spinner, success message) and `aria-live` announcements.

## 2026-10-24 - Form Input Helper Text
**Learning:** Helper text placed visually near an input (like `<small>` under a checkbox) is often missed by screen readers if not programmatically associated.
**Action:** Use `aria-describedby` on the input element pointing to the `id` of the helper text element to ensure it is announced when the input receives focus.
