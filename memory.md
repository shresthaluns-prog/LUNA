# Project Memory
## MERN Jewellery E-commerce Application

> This file is the handoff note for future AI coding sessions. Keep it accurate and concise. Update it after each meaningful implementation task.

---

## 1. Project identity

- **Project:** Jewellery e-commerce application
- **Business model:** Single-vendor store
- **Stack:** MongoDB Atlas + Mongoose, Express.js, React, Node.js
- **Frontend styling:** Tailwind CSS (planned)
- **Target audience:** Nepal and international customers
- **Payment method:** Cash on Delivery (COD) only
- **Brand name:** LUNA
- **Required categories:**
  - Gold jewellery
  - Silver jewellery
  - Artificial / Fashion jewellery
  - Diamond jewellery

## 2. Current status

- **Overall status:** Phase 0 decisions recorded; Phase 1 foundation implemented, Atlas verification pending.
- **Current phase:** Phase 1 — Repository and MERN setup.
- **Last updated:** 2026-11-24

## 3. Documentation baseline

- `PRD.md` — scope, roles, features, business rules, and acceptance criteria.
- `architecture.md` — MERN architecture, proposed folder structure, data models, API, and security.
- `rules.md` — instructions for AI coding assistants.
- `phases.md` — incremental delivery roadmap.
- `design.md` — initial luxury-minimalist visual system.
- `memory.md` — current project state and handoff record.

## 4. Confirmed decisions

| Decision | Confirmed value |
|---|---|
| Business model | Single vendor |
| Product categories | Gold, Silver, Artificial/Fashion, Diamond |
| Payment | COD only |
| Audience | Nepal and international |
| Technology | MERN stack |
| Brand name | LUNA |
| Initial currency | NPR only; no automatic conversion |
| Initial fulfilment market | Nepal; exact serviceable areas remain unverified |
| Checkout | Sign-in required; guest cart stored in browser and merged into account cart |
| COD | Disabled until specific Nepal delivery areas/routes are verified and configured |
| Package manager/runtime | npm with Node 24.x |
| Request validation/tests | Zod; Vitest and Supertest |
| Production image storage | Cloudinary |

## 5. Image assets and responsive requirements

- The owner will provide the jewellery photos.
- During initial development, place static photos in `client/public/images/` with subfolders `gold/`, `silver/`, `artificial/`, `diamond/`, `banners/`, and `categories/`.
- Use root-relative paths such as `/images/gold/gold-ring-01.webp`.
- Aim for 5 useful photos per product; 3 is the minimum practical set and 4–6 is the recommended range. Avoid duplicate angles.
- Use Cloudinary for production/admin uploads; store URLs and metadata in MongoDB.
- Product image URLs and metadata belong in an ordered product `images[]` array; storefront and admin screens must render/manage that data rather than hardcoding URLs.
- Use only owner-provided images as product photos. Inspect files before matching them to products; use a neutral replaceable placeholder when no approved image is available.
- The expected image folders were not present when last inspected; no photos have been assigned to products.
- Responsive behavior is mandatory from 320 px mobile screens through wide desktop. Verify 320, 375/390, 768, 1024, and 1440 px widths.

## 6. Important constraints

1. Do not build a multi-vendor marketplace.
2. Do not add online payment gateways unless the owner changes the requirement.
3. COD must be enabled only for destinations where the business has verified courier/service support.
4. Do not promise international COD worldwide.
5. Do not invent currency, shipping fees, delivery estimates, tax/customs treatment, returns policy, metal purity, gemstone grade, or certification claims.
6. The server is the authority for prices, totals, stock, permissions, and order status.
7. Preserve order snapshots when products change or are archived.

## 7. Decisions still pending

- [ ] Logo, domain, and approved brand assets for LUNA.
- [ ] Exact Nepal delivery coverage and COD courier/serviceability rules.
- [ ] International fulfilment/COD policy; international checkout is not enabled.
- [ ] Shipping fees and delivery estimates by destination.
- [ ] Tax, customs, and duties responsibilities for international orders.
- [ ] Returns, exchanges, warranty, cancellation, and COD refund process.
- [ ] Product-specific required fields and verification/certification policy.
- [ ] Deployment provider and production hosting topology.

Do not treat proposed technology choices as immutable if the owner approves a change. Update the architecture and this file together.

## 8. Completed work

- [x] Initial project requirements documented.
- [x] Initial architecture documented.
- [x] AI coding rules documented.
- [x] Development phases documented.
- [x] Initial design guidelines documented.
- [x] Owner-provided photo handling and production image-storage requirements documented.
- [x] Phase 0 decisions and deferred business policies recorded.
- [x] npm and Node 24.x selected; Zod, Vitest, and Supertest selected.
- [x] Isolated Git repository initialized in `C:\Users\USER\Documents\Jewellery`; parent home-directory repository was not modified.
- [x] React/Vite client and Express/Mongoose server scaffolded with environment examples, health endpoints, error handling, tests, and setup documentation.
- [ ] Development Atlas connection configured and verified through server-side Mongoose.
- [ ] Separate production database, least-privilege database user, Network Access rules, and backup/restore plan configured before launch.

### Phase 1 — Repository and MERN setup

- **Status:** In progress; Atlas startup/readiness verification awaits local development credentials.
- **Completed:** Isolated Git root, React/Vite client, Express/Mongoose API, Zod environment validation, CORS/security headers, health/readiness endpoints, centralized errors, safe environment examples, and setup documentation.
- **Checks:** Client test (1 passed), server tests (5 passed), both linters, client production build, format scripts, and Vite HTTP smoke test (200 OK).
- **Key versions:** Node 24.15.0, npm 11.12.1, React 19.3.1, Vite 8.3.8, Express 5.3.0, Mongoose 9.13.0, Zod 4.6.7, Vitest 5.1.1.
- **Known blocker:** No local `server/.env` or development `MONGODB_URI`; the API has not been started against Atlas.
- **Next task:** Configure a development-only Atlas URI locally and verify API startup and readiness.

## 9. Current task

Complete Phase 1 by configuring a local development Atlas URI, then verify API startup and database readiness. Keep credentials local and do not stage or commit files without authorization.

## 10. Recently modified files

- `PRD.md`
- `architecture.md`
- `phases.md`
- `memory.md`
- `README.md`
- `.gitignore`
- `.nvmrc`
- `.prettierrc.json`
- `client/`
- `server/`

## 11. Known issues / risks

- International COD may not be supported by the selected courier(s). Destination-level capability must be verified before enabling checkout.
- Shipping, tax, customs, returns, and cancellation rules are not yet defined.
- Atlas connectivity remains unverified because no local development `MONGODB_URI` has been configured.
- Phase 1 checks run: client test (1 passed), server tests (5 passed), both linters, client production build, and Vite HTTP smoke test.

## 12. Next actions

1. Configure `server/.env` locally with a development-only Atlas URI and approved Network Access.
2. Verify API startup, `/api/v1/health`, `/api/v1/ready`, and Atlas connectivity.
3. Finish Phase 1 acceptance criteria and record the connection check result.
4. Start Phase 2 only after Phase 1 acceptance criteria pass.

## 13. AI session handoff template

Append or replace this section after each meaningful coding session:

```markdown
### Session — YYYY-MM-DD
- Phase:
- Task:
- Completed:
  - ...
- Files changed:
  - ...
- Tests/checks run:
  - ...
- Results:
- Decisions made:
- Known issues:
- Next task:
```
