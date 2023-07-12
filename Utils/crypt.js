import crypto from 'crypto'

import { CRYPTO_KEY, CRYPTO_ALGO, CRYPTO_IV } from '../Config'

// Hash the keys
const key = crypto.createHash('sha256').update(CRYPTO_KEY).digest('hex').substring(0,32)
const iv = crypto.createHash('sha256').update(CRYPTO_IV).digest('hex').substring(0, 16)

export const encrypt = (value) => {
	const cipher = crypto.createCipheriv(CRYPTO_ALGO, key, iv)
	let encrypted = cipher.update(value, 'utf8', 'hex')
	encrypted += cipher.final('hex')
	return encrypted
}

export const decrypt = (encryptedValue) => {
	const decipher = crypto.createDecipheriv(CRYPTO_ALGO, key, iv)
	let decrypted = decipher.update(encryptedValue, 'hex', 'utf8')
	decrypted += decipher.final('utf8')
	return decrypted
}

export const compare = (encryptedValue, stringToCompare) => {
	const decipher = crypto.createDecipheriv(CRYPTO_ALGO, key, iv)
	let decrypted = decipher.update(encryptedValue, 'hex', 'utf8')
	decrypted += decipher.final('utf8')
	return decrypted === stringToCompare
}