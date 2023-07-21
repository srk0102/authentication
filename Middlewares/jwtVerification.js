import jwt from 'jsonwebtoken'

import { JWT_PRIVATE_KEY, JWT_ALGO, JWT_EXPIRY_TOKEN_TIME, JWT_EXPIRY_REFRESH_TIME } from '../Config'
import { FIFTEENMINUTES, FIVEMINUTES } from '../Constants'
import { TokenService } from '../Services'
import { getUtcTime, addHours, addMonths, getMinutesDiff, Logger, sendResponse } from '../Utils'

export const verifyToken = async (req, res, next) => {
	try {
		const { token, refreshtoken } = req.headers
		const { userId, phone } = decryptToken(token)
		decryptToken(refreshtoken)
		const existingTokens = await TokenService.getOne({ token, refreshtoken, userId, status: 'active' })
		if (!existingTokens) {
			return sendResponse(res, UNAUTHORIZED, '', {}, 'Please login again')
		}
		if (getMinutesDiff(getUtcTime(), existingTokens.tkExpiresAt) <= 0 || getMinutesDiff(getUtcTime(), existingTokens.rtkExpiresAt) <= 0) {
			await TokenService.updateOne({ token, refreshtoken, userId, status: 'active' }, { status: 'expired' })
			return sendResponse(res, UNAUTHORIZED, '', {}, 'Please login again')
		}
		if (getMinutesDiff(getUtcTime(), existingTokens.tkExpiresAt) <= FIFTEENMINUTES && getMinutesDiff(getUtcTime(), existingTokens.rtkExpiresAt) > FIVEMINUTES) {
			const tkexp = addHours(getUtcTime(), 4)
			const newToken = jwt.sign({ userId, phone, expiresAt: tkexp }, JWT_PRIVATE_KEY, { expiresIn: JWT_EXPIRY_TOKEN_TIME, algorithm: JWT_ALGO })
			var updatedToken = await TokenService.updateOne({ token, refreshtoken, userId, status: 'active' }, { token: newToken, tkExpiresAt: tkexp })
		}
		res.token = updatedToken
		next()
	}
	catch (err) {
		return sendResponse(res, UNAUTHORIZED, '', {}, err.message)
	}
}

export const generateToken = async (payload) => {
	try {
		const existingTokens = await TokenService.getOne({ userId: payload.userId, status: 'active' }, { token: 1, refreshtoken: 1, _id: 0 })
		if (existingTokens) {
			return existingTokens
		}
		const tkexp = addHours(getUtcTime(), 4)
		const rtkexp = addMonths(getUtcTime(), 6)
		const tokens = {
			token: jwt.sign({ ...payload, expiresAt: tkexp }, JWT_PRIVATE_KEY, { expiresIn: JWT_EXPIRY_TOKEN_TIME, algorithm: JWT_ALGO }),
			refreshtoken: jwt.sign({ ...payload, expiresAt: rtkexp }, JWT_PRIVATE_KEY, { expiresIn: JWT_EXPIRY_REFRESH_TIME, algorithm: JWT_ALGO })
		}
		await TokenService.create({ userId: payload.userId, ...tokens, tkExpiresAt: tkexp, rtkExpiresAt: rtkexp })
		return tokens
	} catch (err) {
		Logger.error(err.message)
		throw err
	}
}

export const decryptToken = (token) => {
	try {
		const decoded = jwt.verify(token, JWT_PRIVATE_KEY, { algorithm: JWT_ALGO })
		return decoded
	} catch (err) {
		throw err
	}
}