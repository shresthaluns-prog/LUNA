export class HttpError extends Error {
  constructor(statusCode, code, message) {
    super(message)
    this.name = 'HttpError'
    this.statusCode = statusCode
    this.code = code
  }
}

export function notFoundHandler(request, response, next) {
  next(new HttpError(404, 'NOT_FOUND', 'Resource not found'))
}

export function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    next(error)
    return
  }

  const statusCode =
    Number.isInteger(error.statusCode) && error.statusCode >= 400
      ? error.statusCode
      : 500
  const code = statusCode === 500 ? 'INTERNAL_SERVER_ERROR' : error.code
  const message =
    statusCode === 500 ? 'An unexpected error occurred' : error.message

  if (statusCode === 500) {
    const logMessage =
      error instanceof Error
        ? error.message.replace(
            /mongodb(?:\+srv)?:\/\/\S+/gi,
            '[redacted MongoDB URI]',
          )
        : 'Unknown error'
    const errorName = error instanceof Error ? error.name : 'Error'

    console.error(`Unhandled API error (${errorName}): ${logMessage}`)
  }

  response.status(statusCode).json({
    success: false,
    error: { code, message },
  })
}
