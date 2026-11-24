import mongoose from 'mongoose'
import request from 'supertest'
import { afterAll, describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'

const app = createApp({ clientOrigin: 'http://localhost:5173' })

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
  }
})

describe('health endpoints', () => {
  it('reports API liveness and the current database state', async () => {
    const response = await request(app).get('/api/v1/health')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      success: true,
      data: { api: 'ok', database: 'disconnected' },
    })
  })

  it('does not report readiness while the database is disconnected', async () => {
    const response = await request(app).get('/api/v1/ready')

    expect(response.status).toBe(503)
    expect(response.body.error.code).toBe('SERVICE_UNAVAILABLE')
  })
})

describe('API errors', () => {
  it('returns a consistent not-found response', async () => {
    const response = await request(app).get('/api/v1/not-a-route')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Resource not found' },
    })
  })
})
