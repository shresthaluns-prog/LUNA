# AI Coding Rules
## Instructions for AI coding assistants

These rules apply to every AI-assisted change in this repository. Follow them before editing code.

---

## 1. Work process

1. Read `PRD.md`, `architecture.md`, `phases.md`, `design.md`, and the latest `memory.md` before starting a substantial task.
2. Inspect the existing repository before proposing or changing files.
3. Identify the current phase and the exact requested task.
4. Make the smallest complete change that satisfies the task.
5. Reuse existing components, services, patterns, and dependencies.
6. Do not assume a feature exists just because it is described in a plan.
7. If a requirement is ambiguous or conflicts with an existing decision, ask a concise clarification or state the assumption before implementing.
8. After implementation, run relevant linting, tests, and build commands that are available.
9. Report files changed, behavior implemented, checks run, results, and known gaps.
10. Update `memory.md` after completing a meaningful task or phase.

## 2. Scope control

- Implement only the feature or phase requested.
- Do not rewrite unrelated files or redesign the whole application without approval.
- Do not introduce new features, packages, services, or architectural patterns without explaining why they are needed.
- Do not silently change API contracts, database fields, route behavior, design tokens, or business rules.
- Preserve existing working behavior.
- If a requested change requires a schema/API migration, explain the impact and include a safe migration/backfill plan where applicable.

## 3. Project identity and business rules

- This is a **single-vendor** jewellery store, not a marketplace.
- Required catalogue categories: Gold jewellery, Silver jewellery, Artificial/Fashion jewellery, and Diamond jewellery.
- Target audience includes Nepal and international visitors/customers.
- **COD is the only payment method in the current release.**
- Never add card, wallet, online banking, or payment-gateway flows unless the owner explicitly changes the requirement and updates the documents.
- Never claim COD is available worldwide. Check the configured destination serviceability rules.
- If a destination is not configured as COD-serviceable, block checkout clearly and direct the customer to the approved support/contact path.
- Do not invent shipping prices, taxes, customs fees, delivery estimates, metal purity, gemstone grades, certificates, or product authenticity claims.
- Do not add vendor onboarding, seller dashboards, commissions, or payouts.

## 4. Frontend rules

- Use functional React components and hooks.
- Keep components focused and reusable.
- Keep feature-specific components and logic inside the relevant `features/` area.
- Separate API access from presentational components.
- Use the existing router and provider setup.
- Handle loading, empty, success, and error states.
- Use semantic HTML and accessible labels.
- Support keyboard navigation and visible focus states.
- Use responsive layouts; verify narrow mobile widths as well as desktop.
- Provide meaningful image alt text.
- Avoid unnecessary global state. Use the agreed server-state and local-state tools.
- Never store secrets in frontend code or `VITE_` variables.
- Do not trust client-side prices, stock, roles, or order totals.
- Do not use placeholder buttons that appear functional but do nothing. Either implement the action or mark it clearly as unavailable.

## 5. Backend rules

- Follow the architecture's routes → middleware → controllers → services → models separation.
- Controllers should remain thin; business rules belong in services.
- Validate request body, params, and query strings.
- Use allowlists for sort fields and filters.
- Never pass raw client objects directly into MongoDB queries or updates.
- Use explicit projections and safe response serializers.
- Use async error handling and centralized error middleware.
- Use appropriate HTTP status codes and stable error codes.
- Add authorization and ownership checks to every protected resource.
- Keep database indexes aligned with real query patterns.
- Avoid N+1 queries and unbounded list responses.
- Do not expose stack traces or internal database errors in production responses.

## 6. Security and privacy

- Hash passwords; never log or return password hashes.
- Keep secrets in environment variables or a secret manager.
- Use MongoDB Atlas as the hosted database; connect only from the Express server through Mongoose.
- Never expose `MONGODB_URI`, database usernames, or passwords in frontend code, browser bundles, logs, screenshots, or committed files.
- Use a dedicated least-privilege Atlas database user and separate development/test/production databases.
- Do not run destructive tests against production Atlas data; verify Network Access and backup/restore settings before launch.
- Never commit credentials, tokens, private keys, or production data.
- Enforce admin permissions on the server, not only by hiding UI.
- Customers may access only their own profile, addresses, wishlist, and orders.
- Protect authentication cookies with appropriate `httpOnly`, `secure`, and `sameSite` settings.
- Implement CSRF/origin protections appropriate to the cookie deployment.
- Rate-limit sensitive endpoints such as login and registration.
- Validate and constrain uploads.
- Do not log unnecessary personal data.
- Sanitize/escape untrusted content in rendered output.
- Use dependency versions from the project lockfile; do not blindly upgrade packages.

## 7. Data and commerce rules

- The server is the source of truth for product price, stock, shipping, COD serviceability, and order totals.
- Re-fetch product and variant data at checkout.
- Use integer minor units for money; do not use floating-point arithmetic for currency calculations.
- Store currency explicitly with monetary values and orders.
- Prevent negative stock and overselling.
- Make inventory changes atomic where possible; test concurrency-sensitive flows.
- Create order-item snapshots so historical orders remain readable after catalogue edits.
- Do not destructively delete products referenced by historical orders; prefer archive/soft-delete.
- Validate order status transitions.
- Record order status changes with actor and timestamp.
- Ensure cancellation/return/restock behavior is consistent and documented.
- Never mark a COD order as collected/paid before the actual collection is confirmed by the business process.

## 8. Code quality

- Use clear, descriptive names.
- Keep functions small and responsibilities focused.
- Avoid duplicated business logic.
- Avoid deeply nested conditionals when a clear early return is possible.
- Avoid `any`-style unsafe shortcuts if TypeScript is introduced.
- Do not suppress lint or type errors without explaining and documenting why.
- Remove dead code and debug logs introduced by the change.
- Add comments for non-obvious decisions, not for every line.
- Prefer explicit error handling over silent fallbacks.

## 9. Testing requirements

For each change:
- Add or update tests for changed behavior.
- Test validation failures and relevant edge cases.
- Test unauthenticated and unauthorized access where relevant.
- Test customer ownership boundaries for private resources.
- Test mobile and desktop behavior for UI changes.
- Run relevant tests, lint, and build commands.
- If a check cannot run, state why; never claim it passed.

Critical commerce scenarios to test:
- Product becomes unavailable between add-to-cart and checkout.
- Price changes between add-to-cart and checkout.
- Two orders compete for the last unit of stock.
- Unsupported destination attempts COD checkout.
- Customer attempts to access another customer's order.
- Non-admin attempts an admin operation.
- Invalid order status transition.
- Cancelled/returned order inventory handling.

## 10. Design rules

- Follow `design.md` and its tokens.
- Keep the visual language premium, minimal, and product-focused.
- Do not introduce arbitrary colors, fonts, shadows, radii, or spacing values when tokens exist.
- Product photography should be prominent and consistent.
- Avoid clutter, excessive animation, and distracting effects.
- Maintain readable contrast and accessible typography.
- Keep layouts responsive and touch-friendly.

## 11. Documentation and memory

- Update `memory.md` after meaningful work.
- Record completed work, current task, modified files, decisions, pending tasks, and known issues.
- Update the relevant source document when a product or architecture decision changes.
- Do not mark a phase complete until its acceptance criteria are met.
- Keep examples and setup instructions accurate to the actual code.

## 12. Definition of done

A task is done only when:
- The requested behavior is implemented.
- Existing behavior has not been unintentionally broken.
- Validation and authorization are in place where needed.
- Relevant tests are added/updated and run.
- Lint/build checks are run where available.
- Responsive/accessibility behavior is checked for UI work.
- Documentation and `memory.md` are updated when appropriate.
- The final report lists changes, checks, and remaining limitations.
