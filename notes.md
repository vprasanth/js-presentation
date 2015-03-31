Implicit coercions
- null will convert to 0
- undefined will convert to NaN
- NaN != NaN
- use undefined to check for truthiness

Primitive wrappers
- when wrapping primitives, behavior is different for equality
- setting and getting properties on primitives implicitly creates object wrappers

Avoid using ==
- use ===
- use own explicit coercions
