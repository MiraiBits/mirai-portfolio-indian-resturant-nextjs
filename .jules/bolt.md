# Bolt's Journal

## 2024-05-22 - React Compiler & Component Extraction
**Learning:** React Compiler is enabled in this project (`reactCompiler: true`). This means manual `useMemo`/`useCallback` is largely unnecessary. However, the compiler can only optimize *components*. Inline JSX loops (like mapping over a list and returning JSX directly) cannot be memoized as independent units to skip re-rendering when the parent re-renders.
**Action:** To optimize lists, we must still extract list items into separate components. This allows the React Compiler (or manual `React.memo`) to prevent unnecessary re-renders of the list items when the parent state changes.

## 2026-03-02 - next/font Double Loading Optimization
**Learning:** When using `next/font/google` to serve optimized fonts, adding an `@import` statement and redefining CSS font variables in global CSS files overrides Next.js optimization. This creates a severe performance anti-pattern by causing render-blocking network requests and double-loading the same fonts.
**Action:** Always verify that `next/font` is the sole provider of custom fonts in the application. Remove legacy `@import` statements from CSS files when migrating to `next/font`.
