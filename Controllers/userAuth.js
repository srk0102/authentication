
import { generateToken } from '../Middlewares'
import { Logger, sendResponse, encrypt, compare, verifyOtp, deleteOtp } from '../Utils'
import { UserService } from '../Services'
import { SIGNUP, CONTACTNO } from '../Constants'
import { NODE_ENV } from '../Config'

export const signup = async (req, res) => {
	try {
		const { phone, email, password, userName, whatsappComm, emailComm, otp, countryCode, userType } = req.body
		const verification = await verifyOtp(phone, CONTACTNO, countryCode, SIGNUP, otp,)
		if (!verification) {
			return sendResponse(res, FORBIDDEN, '', {}, 'Invalid Otp')
		}
		await deleteOtp(phone, CONTACTNO, countryCode)
		const encryptedPassword = encrypt(password)
		const existingUser = await UserService.getOne({ $or: [{ phone }, { email }] }, { phone: 1, email: 1, _id: 0 })
		if (existingUser) {
			return sendResponse(res, FORBIDDEN, '', { existingUser }, 'Already registered with us, Try to login')
		}
		const newUser = await UserService.create({ phone, email, password: encryptedPassword, userName, userType, whatsappComm, emailComm })
		const token = await generateToken({ phone, userId: newUser._id })
		res.cookie('token', token.token, {
			httpOnly: true,
			secure: NODE_ENV === 'prod',
		})
		res.cookie('refreshtoken', token.refreshtoken, {
			httpOnly: true,
			secure: NODE_ENV === 'prod',
		})
		return sendResponse(res, SUCCESS, 'Signup successful', { token }, '')
	}
	catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, 'Signup failed', {}, err.message)
		throw err
	}
}

export const login = async (req, res) => {
	try {
		const { phone, password } = req.body
		const existingUser = await UserService.getOne({ phone })
		if (!existingUser) {
			return sendResponse(res, UNAUTHORIZED, '', {}, 'You are not registered with us')
		}
		const checkUser = compare(existingUser.password, password)
		if (!checkUser) {
			return sendResponse(res, UNAUTHORIZED, '', {}, 'You have entered wrong password')
		}
		const token = await generateToken({ userId: existingUser._id, phone })
		res.cookie('token', token.token, {
			httpOnly: true,
			secure: NODE_ENV === 'prod',
		})
		res.cookie('refreshtoken', token.refreshtoken, {
			httpOnly: true,
			secure: NODE_ENV === 'prod',
		})
		return sendResponse(res, SUCCESS, 'Login successful', { token }, '')
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