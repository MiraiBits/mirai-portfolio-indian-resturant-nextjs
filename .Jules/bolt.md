## 2025-02-18 - React Compiler vs Manual Memo
**Learning:** This project uses `reactCompiler: true`. Manual `React.memo()` usage caused build failures due to incorrect syntax/imports and is redundant.
**Action:** Rely on React Compiler for memoization. Extract components to enable granular compiler optimization instead of wrapping in `memo`.

## 2024-05-22 - Broken Manual Optimization vs React Compiler
**Learning:** The codebase contained a broken manual `React.memo` implementation (missing import and syntax error) while `reactCompiler: true` was enabled.
**Action:** When `reactCompiler` is enabled, rely on it for automatic memoization unless specific fine-tuning is needed. If manual `memo` is used, ensure correct syntax and imports to avoid build failures. Always verify build after refactoring.

## 2025-02-18 - Font Loading Optimization
**Learning:** Manual `@import` of Google Fonts in `globals.css` blocks rendering and duplicates requests when `next/font` is already configured in `layout.js`.
**Action:** Use `next/font` exclusively for font loading. Ensure CSS variables defined in `layout.js` (e.g., `--font-heading`) are used in global CSS instead of re-importing fonts.
