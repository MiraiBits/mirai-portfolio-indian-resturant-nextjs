## 2025-02-18 - React Compiler vs Manual Memo
**Learning:** This project uses `reactCompiler: true`. Manual `React.memo()` usage caused build failures due to incorrect syntax/imports and is redundant.
**Action:** Rely on React Compiler for memoization. Extract components to enable granular compiler optimization instead of wrapping in `memo`.
