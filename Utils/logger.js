import dayjs from 'dayjs'

export const getCurrentTimestamp = () => {
	const timestamp = dayjs()
	return `[${timestamp}]`
}

export const Logger = {
	info: (message) => {
		console.log(`\x1b[34m[INFO]\x1b[0m TimeStamp: ${getCurrentTimestamp()}, Message: ${message}`)
	},
	success: (message) => {
		console.error(`\x1b[32m[SUCCESS]\x1b[0m TimeStamp: ${getCurrentTimestamp()}, Message: ${message}`)
	},
	warning: (message) => {
		console.error(`\x1b[33m[WARNING]\x1b[0m TimeStamp: ${getCurrentTimestamp()}, Message: ${message}`)
	},
	error: (message) => {
		console.error(`\x1b[31m[ERROR]\x1b[0m TimeStamp: ${getCurrentTimestamp()}, Message: ${message}`)
	}
}