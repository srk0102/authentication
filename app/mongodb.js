import mongoose from 'mongoose'

import { MONGO } from '../Config'
import { Logger } from '../Utils'

const { MONGO_DB, MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_URL, MONGO_USER } = MONGO

// Connection URL
const url = MONGO_URL ? MONGO_URL : `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`

// Connect to the MongoDB server using Mongoose
export const mongoConnection = async () => {
	try {
		await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
		Logger.success('Connected to MongoDB successfully')
	}
	catch (err) {
		Logger.error(err.message)
		throw err
	}
}
