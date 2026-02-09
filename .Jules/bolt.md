## 2024-05-22 - React.memo Require Strict Prop Stability
**Learning:** React.memo is ineffective if callback props are passed as inline arrow functions or unstable references from parent components. This causes re-renders despite memoization, defeating the purpose.
**Action:** Always verify that props passed to memoized components are stable (e.g., using useCallback for functions, useMemo for objects).
