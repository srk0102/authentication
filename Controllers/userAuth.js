
import { generateToken } from '../Middlewares'
import { Logger, sendResponse, encrypt, compare } from '../Utils'
import { UserService } from '../Services'
import { META_TOKEN } from '../Config'
import { SUBSCRIBE } from '../Constants'

export const signup = async (req, res) => {
	try {
		const { phone, email, password, userName, whatsappComm, emailComm } = req.body
		const encryptedPassword = encrypt(password)
		const existingUser = await UserService.getOne({ $or: [{ phone }, { email }] }, { phone: 1, email: 1, _id: 0 })
		if (existingUser) {
			return sendResponse(res, FORBIDDEN, '', { existingUser }, 'user already exist')
		}
		const newUser = await UserService.create({ phone, email, password: encryptedPassword, userName, whatsappComm, emailComm })
		const token = await generateToken({ phone, userId: newUser._id })
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
		return sendResponse(res, SUCCESS, 'Login successful', { token }, '')
	} catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, 'Login failed', {}, err.message)
		throw err
	}
}

export const verifyAuth = async (req, res) => {
	try{
		sendResponse(res, SUCCESS, 'Token verified', {}, '')
	}
	catch(err){
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, '', {}, err.message)
		throw err
	}
}

export const whatsapp = async (req, res) => {
	try {
		const { mode, challenge, verify_token } = req.query.hub
		if (mode === SUBSCRIBE && verify_token === META_TOKEN) {
			sendResponse(res, SUCCESS, 'SUCCESS', { challenge })
		} else {
			sendResponse(res, FORBIDDEN, '', {}, 'not allowed')
		}
	}
	catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, '', {}, err.message)
		throw err
	}
}