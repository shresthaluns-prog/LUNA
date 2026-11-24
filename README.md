# LUNA Jewellery

Single-vendor jewellery store application. The current implementation is the
Phase 1 foundation; customer shopping and admin workflows are not implemented
yet.

## Requirements

- Node.js 24.x
- npm 11 or newer
- MongoDB Atlas development connection URI

## Setup

Install client and server dependencies from the project root:

```powershell
npm --prefix client install
npm --prefix server install
```

Create local environment files from the examples:

```powershell
if (!(Test-Path server\.env)) { Copy-Item server\.env.example server\.env }
if (!(Test-Path client\.env)) { Copy-Item client\.env.example client\.env }
```

Set `MONGODB_URI` in `server\.env` to a development-only Atlas connection URI,
and ensure Atlas Network Access allows the development machine. Keep real
credentials in local environment files; never put them in the client or commit
them. The client environment contains only the public API base URL.

Start the API and client in separate PowerShell terminals:

```powershell
npm --prefix server run dev
npm --prefix client run dev
```

The API liveness endpoint is `http://localhost:5000/api/v1/health`. Its
readiness endpoint, `http://localhost:5000/api/v1/ready`, returns a service
unavailable response until MongoDB is connected.

## Checks

```powershell
npm --prefix server test
npm --prefix server run lint
npm --prefix server run format
npm --prefix client test
npm --prefix client run lint
npm --prefix client run build
npm --prefix client run format
```

## Security and business constraints

- MongoDB is accessed by the Express API only.
- Do not add product photos unless supplied by the owner; local product images
  belong under `client/public/images/` and use `/images/...` browser URLs.
- The initial currency is NPR. COD checkout remains unavailable until specific
  Nepal delivery routes are verified and configured.
- No production secrets belong in `.env.example`, browser variables, or source
  control.
