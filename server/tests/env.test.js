import { describe, expect, it } from 'vitest'
import { loadConfig } from '../src/config/env.js'

describe('loadConfig', () => {
  it('parses valid server configuration', () => {
    expect(
      loadConfig({
        NODE_ENV: 'test',
        PORT: '5050',
        MONGODB_URI: 'mongodb://localhost:27017/luna-test',
        CLIENT_ORIGIN: 'http://localhost:5173',
      }),
    ).toEqual({
      nodeEnv: 'test',
      port: 5050,
      mongodbUri: 'mongodb://localhost:27017/luna-test',
      clientOrigin: 'http://localhost:5173',
    })
  })

  it('rejects missing or invalid required configuration', () => {
    expect(() =>
      loadConfig({
        PORT: '0',
        MONGODB_URI: '',
        CLIENT_ORIGIN: 'not-a-url',
      }),
    ).toThrow('Invalid server environment')
  })
})
