import { Router } from 'express'
import mongoose from 'mongoose'

const connectionStates = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
}

const router = Router()

router.get('/health', (request, response) => {
  response.json({
    success: true,
    data: {
      api: 'ok',
      database: connectionStates[mongoose.connection.readyState] ?? 'unknown',
    },
  })
})

router.get('/ready', (request, response) => {
  if (mongoose.connection.readyState !== 1) {
    response.status(503).json({
      success: false,
      error: {
        code: 'SERVICE_UNAVAILABLE',
        message: 'The database connection is not ready',
      },
    })
    return
  }

  response.json({
    success: true,
    data: { api: 'ready', database: 'connected' },
  })
})

export default router
