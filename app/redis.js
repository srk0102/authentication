import { createClient } from 'redis'

import { REDIS } from '../Config'
import { Logger } from '../Utils'

export const redisClient = createClient({
	port: REDIS.REDIS_PORT,
	host: REDIS.REDIS_HOST,
	password: REDIS.REDIS_PASSWORD,
	tls: {}
})

export const redisInit = async () => {
	try {
		redisClient.on('connect', function () {
			Logger.info('Connected to Redis Server')
		})
		redisClient.on('error', function (err) {
			Logger.error('Connection error while connecting to Redis Server')
		})
	}
	catch (err) {
		throw err
	}
}