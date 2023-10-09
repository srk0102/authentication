
import { generateToken, generateSignUpToken, decryptValidateToken } from '../Middlewares'
import { Logger, sendResponse, encrypt, compare } from '../Utils'
import { UserService } from '../Services'
import { NODE_ENV } from '../Config'
import { VALIDATION_TOKENS } from '../Constants'
import { Types } from 'mongoose'

export const signup = async (req, res) => {
	try {
		const { email, password, userName, source } = req.body
		const encryptedPassword = encrypt(password)
		const existingUser = await UserService.getOne({ email }, { email: 1, _id: 0 })
		if (existingUser) {
			return sendResponse(res, FORBIDDEN, '', { existingUser }, `Welcome back ${existingUser.userName}! Let's get you logged in!`)
		}
		const newUser = await UserService.create({ email, password: encryptedPassword, userName, source })
		const token = await generateSignUpToken({ userId: newUser._id, source: VALIDATION_TOKENS.emailVerification })

		//TODO - send tokens to user email using notification service

		return sendResponse(res, SUCCESS, 'Check your registered email for a magical message! 💌 Verify within 24 hours. 🕒✨', {}, '')
	}
	catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, 'oops! Signup failed', {}, err.message)
		throw err
	}
}

export const verifyEmail = async (req, res) => {
	try {
		const { token } = req.params
		const { userId, source } = decryptValidateToken(token)

		if (source !== VALIDATION_TOKENS.emailVerification) {
			return sendResponse(res, UNAUTHORIZED, 'Sorry, Access Denied.', { token }, '')
		}

		await UserService.updateOne({ _id: new Types.ObjectId(userId) }, { verified: true })

		return sendResponse(res, SUCCESS, 'Email verification: Mission Accomplished! 🚀📧🔒', {}, '')
	} catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, 'oops! Verification failed', {}, err.message)
		throw err
	}
}

export const requestVerificationEmail = async (req, res) => {
	try {
		const { email } = req.body
		const existingUser = await UserService.getOne({ email })
		if (!existingUser) {
			return sendResponse(res, UNAUTHORIZED, '', {}, 'Apologies, we couldn\'t find your record in our registry.')
		}

		const token = await generateSignUpToken({ userId: newUser._id, source: VALIDATION_TOKENS.emailVerification })

		return sendResponse(res, SUCCESS, 'Guard your account: Confirm your email within 24 hours, or risk losing it.', { token }, '')

	} catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, 'oops! request failed', {}, err.message)
		throw err
	}
}

export const login = async (req, res) => {
	try {
		const { email, password } = req.body
		const existingUser = await UserService.getOne({ email })
		if (!existingUser) {
			return sendResponse(res, UNAUTHORIZED, '', {}, 'Apologies, we couldn\'t find your record in our registry.')
		}
		if (!existingUser.verified) {
			return sendResponse(res, UNAUTHORIZED, '', {}, 'Kindly verify your email before logging in.')
		}
		const checkUser = compare(existingUser.password, password)
		if (!checkUser) {
			return sendResponse(res, UNAUTHORIZED, '', {}, 'Oops! Wrong Password - Let\'s Try That Again!')
		}
		const token = await generateToken({ userId: existingUser._id, source: existingUser.source })

		res.cookie('token', token.token, {
			httpOnly: true,
			secure: NODE_ENV === 'prod',
		})

		return sendResponse(res, SUCCESS, 'Login successful', {}, '')
	} catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, 'Login failed', {}, err.message)
		throw err
	}
}

export const verifyAuth = async (req, res) => {
	try {
		sendResponse(res, SUCCESS, 'Token verified', {}, '')
	}
	catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, '', {}, err.message)
		throw err
	}
}