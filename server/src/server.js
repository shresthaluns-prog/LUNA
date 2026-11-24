import 'dotenv/config'
import mongoose from 'mongoose'
import { createApp } from './app.js'
import { connectToDatabase } from './config/database.js'
import { loadConfig } from './config/env.js'

async function startServer() {
  const config = loadConfig()
  await connectToDatabase(config.mongodbUri)

  const app = createApp({ clientOrigin: config.clientOrigin })
  const server = app.listen(config.port, () => {
    console.info(`LUNA API listening on port ${config.port}`)
  })

  let shuttingDown = false

  async function shutdown(signal) {
    if (shuttingDown) {
      return
    }

    shuttingDown = true
    console.info(`Received ${signal}; shutting down`)

    server.close(async (error) => {
      if (error) {
        console.error('HTTP server shutdown failed:', error)
        process.exitCode = 1
      }

      try {
        await mongoose.disconnect()
      } catch (disconnectError) {
        console.error('MongoDB shutdown failed:', disconnectError)
        process.exitCode = 1
      }
    })
  }

  process.once('SIGINT', () => void shutdown('SIGINT'))
  process.once('SIGTERM', () => void shutdown('SIGTERM'))
}

startServer().catch((error) => {
  const message =
    error instanceof Error
      ? error.message.replace(
          /mongodb(?:\+srv)?:\/\/\S+/gi,
          '[redacted MongoDB URI]',
        )
      : 'Unknown startup error'
  const errorName = error instanceof Error ? error.name : 'Error'

  console.error(`Unable to start LUNA API (${errorName}): ${message}`)
  process.exitCode = 1
})
