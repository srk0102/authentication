
import { Logger, sendResponse} from '../Utils'

export const signup = (req, res) => {
	try {
		const { phone, email, password, userName, whatsappComm, emailComm } = req.body
		return sendResponse(res, SUCCESS, 'just test signup', { phone, email, password, userName, whatsappComm, emailComm }, '')
	}
	catch (err) {
		Logger.error(err.message)
		throw err
	}
}

export const login = (req, res) => {
	try {
		const { emailOrPhone, password } = req.body
		return sendResponse(res, SUCCESS, 'just test login', { emailOrPhone, password }, '')
	} catch (err) {
		Logger.error(err.message)
		throw err
	}
}