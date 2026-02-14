## 2025-10-26 - Redundant Font Loading vs Next.js Font Optimization
**Learning:** Found that `next/font` was correctly configured in `layout.js`, but `globals.css` still contained an `@import` from Google Fonts and manual CSS variable definitions. This caused double loading of fonts (one optimized, one blocking).
**Action:** Always check `globals.css` for `@import` statements when `next/font` is in use. Remove them to rely solely on the optimized font loading.

## 2025-10-26 - React Compiler Effectiveness
**Learning:** React Compiler (enabled by default in this Next.js 16 setup) successfully optimized component re-renders that would traditionally require `useCallback` and `React.memo`, rendering manual optimization redundant for simple prop stability cases.
**Action:** Before applying manual memoization, verify if React Compiler is already handling it. Focus optimization efforts on things the compiler cannot do (like resource loading).
