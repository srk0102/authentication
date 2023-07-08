import jwt from 'jsonwebtoken'

import { JWT_PRIVATE_KEY, JWT_EXPIRY_TIME } from '../Config'

export const generateToken = (payload) => {
	try {
		return jwt.sign(payload, JWT_PRIVATE_KEY, { JWT_EXPIRY_TIME })
	} catch (err) {
		throw err
	}
}

export const decryptToken = (token) => {
	try {
		const decoded = jwt.verify(token, JWT_PRIVATE_KEY)
		return decoded
	} catch (err) {
		throw err
	}
}