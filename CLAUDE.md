# Code style for AI agents

Follow these whenever adding, removing, or reviewing code in this repo.

1. **Self-documenting code over comments.** Prefer clear names and small extracted helpers to explanatory comments. Use comments only for (a) business/domain logic (math, laws, non-obvious rules) and (b) doc comments (`/** … */`) on functions, parameters, and type fields a name can't make obvious. Drop any comment a ≤4-word name, a renamed parameter, or an extracted variable/function would replace.

2. **Descriptive names.** No cryptic abbreviations (`p`→`path`, `ver`→`version`). Name functions with verbs (`getByPath`).

3. **Constrained values → constants + union type.** When a field accepts only known values, model them as named constants and a union, not open `string`/`any`.

4. **Shallow, single-responsibility logic.** Avoid nested conditionals; extract each branch into a small, well-named function and compose them (e.g. `getByPath() ?? getByGroup() ?? getByVersion() ?? getDefault()`). Keep secondary concerns (e.g. debug logging) in their own function.
