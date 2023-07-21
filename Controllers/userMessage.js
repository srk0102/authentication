
import { Logger, sendResponse, generateOtp, verifyOtp, deleteOtp, sendWhatsappMessage } from '../Utils'
import { META_TOKEN } from '../Config'
import { SUBSCRIBE } from '../Constants'

export const sendOtp = async (req, res) => {
	try {
		const { reference, referenceType, countryCode } = req.body
		const otp = await generateOtp(reference, referenceType, countryCode, 4)
		if (referenceType === 'contactno') {
			await sendWhatsappMessage(countryCode + reference, otp)
		} else {
			await sendEmail(reference, otp)
		}
		return sendResponse(res, SUCCESS, 'Otp generated successfully', { otp }, '')
	}
	catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, '', {}, err.message)
		throw err
	}
}

export const validateOtp = async (req, res) => {
	try {
		const { reference, referenceType, countryCode, otp } = req.body
		const verification = await verifyOtp(reference, referenceType, countryCode, otp)
		if (verification) {
			await deleteOtp(reference, referenceType, countryCode)
			return sendResponse(res, SUCCESS, 'Otp verified successfully', {}, '')
		} else {
			return sendResponse(res, NOTFOUND, '', {}, 'Oops! It looks like the OTP you entered is incorrect')
		}
	}
	catch (err) {
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