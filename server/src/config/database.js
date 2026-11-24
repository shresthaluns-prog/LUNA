import mongoose from 'mongoose'

export async function connectToDatabase(uri) {
  if (!uri) {
    throw new Error('A MongoDB connection URI is required')
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })

  return mongoose.connection
}
