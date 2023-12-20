import { redisOperation, sendResponse } from '../Utils'
import { redisClient } from '../app'

export const getRedisData = async (id) => {
	try {
		if (!id) {
			return sendResponse(res, INVALIDREQUEST, '', {}, 'ERR003')
		}

		const data = await redisOperation(id, 'get')
		return JSON.parse(data)
	} catch (error) {
		throw error
	}
}
export const setRedisData = async (id, data, maxAge) => {
	let ttl = await redisOperation(id, 'ttl')
	return new Promise((resolve) => redisClient.set(id, JSON.stringify(data), 'EX', ttl > 0 ? ttl : maxAge,
		async () => {
			resolve(await redisOperation(id, 'get'))
		}
	))
}

export const removeRedisData = async (id) => {
	try {
		await redisOperation(id, 'del')
	} catch (error) {
		throw error
	}
}