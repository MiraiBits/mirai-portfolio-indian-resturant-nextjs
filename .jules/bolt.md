# Bolt's Journal

## 2024-05-22 - React Compiler & Component Extraction
**Learning:** React Compiler is enabled in this project (`reactCompiler: true`). This means manual `useMemo`/`useCallback` is largely unnecessary. However, the compiler can only optimize *components*. Inline JSX loops (like mapping over a list and returning JSX directly) cannot be memoized as independent units to skip re-rendering when the parent re-renders.
**Action:** To optimize lists, we must still extract list items into separate components. This allows the React Compiler (or manual `React.memo`) to prevent unnecessary re-renders of the list items when the parent state changes.

## 2024-05-23 - Redundant Font Requests
**Learning:** When using `next/font` to load Google Fonts (e.g., in `app/layout.js`), avoid using `@import` for the same fonts in global CSS files. `next/font` automatically generates and injects CSS variables while downloading fonts at build time. Using `@import` introduces a render-blocking request and nullifies the built-in Next.js font optimization.
**Action:** Remove redundant `@import` rules and manual CSS variable declarations when `next/font` is utilized.
