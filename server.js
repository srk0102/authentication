import { mongoConnection, redisInit, InitializeApp } from './app'
import { Logger } from './Utils'
import { PORT } from './Config'

//Initialize server
(async () => {
	try {
		await mongoConnection()
		await redisInit()
		const app = InitializeApp()
		app.listen(PORT, () => {
			Logger.success(`Server Running on ${PORT}`)
		})
	}
	catch (err) {
		Logger.error('Bootstrap server error' + err.message)
		throw (err)
	}
})()