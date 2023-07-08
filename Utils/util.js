import { redisClient } from '../app'

export const redisOperation = async (param, operation) => {
	return await new Promise((resolve, reject) => redisClient[operation](param, (err, data) => {
		if (err) {
			reject(err)
		} else {
			resolve(data)
		}
	}))
}
