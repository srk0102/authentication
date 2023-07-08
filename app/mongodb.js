import mongoose from 'mongoose'

import { MONGO } from '../Config'
import { Logger } from '../Utils'

const { MONGO_DB, MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_URL, MONGO_USER } = MONGO

// Connection URL
const url = MONGO_URL ? MONGO_URL : `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`

// Connect to the MongoDB server using Mongoose
export const mongoConnection = () => {
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => {
			Logger.success('Connected to MongoDB successfully')

			// Perform database operations with Mongoose
			// ...

			// Disconnect from MongoDB
			mongoose.connection.close()
		})
		.catch((err) => {
			Logger.error(err)
		})
}
