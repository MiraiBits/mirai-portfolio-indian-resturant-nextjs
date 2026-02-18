## 2024-05-22 - Broken Manual Optimization vs React Compiler
**Learning:** The codebase contained a broken manual `React.memo` implementation (missing import and syntax error) while `reactCompiler: true` was enabled.
**Action:** When `reactCompiler` is enabled, rely on it for automatic memoization unless specific fine-tuning is needed. If manual `memo` is used, ensure correct syntax and imports to avoid build failures. Always verify build after refactoring.
