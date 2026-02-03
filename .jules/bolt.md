# Bolt's Journal

## 2024-05-22 - React Compiler & Component Extraction
**Learning:** React Compiler is enabled in this project (`reactCompiler: true`). This means manual `useMemo`/`useCallback` is largely unnecessary. However, the compiler can only optimize *components*. Inline JSX loops (like mapping over a list and returning JSX directly) cannot be memoized as independent units to skip re-rendering when the parent re-renders.
**Action:** To optimize lists, we must still extract list items into separate components. This allows the React Compiler (or manual `React.memo`) to prevent unnecessary re-renders of the list items when the parent state changes.
