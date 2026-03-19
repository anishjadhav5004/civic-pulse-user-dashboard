---
description: Perform a detailed code review of the current file against standard practices and team rules.
---

When the user manually runs `/review`, perform a strict and detailed code review on the currently active file, or any specific files the user provides.

1. **Syntax & TypeScript:** Ensure the code is strictly typed, avoiding `any`. Validate that modern features (ES2022+, optional chaining) are used where applicable instead of legacy constructs.
2. **Architecture (CQRS & NestJS):** Verify that the file appropriately separates infrastructure from the pure domain logic. If it is a Command or Query handler, ensure it only performs its respective duty (mutating vs reading).
3. **Performance & Optimization:** Identify any inefficient loops, unnecessary mapping, or potential N+1 database querying issues (especially involving TypeORM or MongoDB).
4. **Error Handling:** Check if exceptions are gracefully caught or bubbled up appropriately.
5. **Output Format:**
   - Summarize the overall quality.
   - Provide a bolded list of **Actionable Fixes** (if any).
   - If there are fixes, provide the exact corrected code block so the user can easily adopt it.
   - If the code is perfect, congratulate the user for following the global standards.
