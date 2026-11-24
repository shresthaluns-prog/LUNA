import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js'
import healthRouter from './routes/health.routes.js'

export function createApp({ clientOrigin }) {
  if (!clientOrigin) {
    throw new Error('A client origin is required to configure CORS')
  }

  const app = express()

  app.disable('x-powered-by')
  app.use(helmet())
  app.use(cors({ origin: clientOrigin, credentials: true }))
  app.use(express.json({ limit: '100kb' }))
  app.use('/api/v1', healthRouter)
  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
