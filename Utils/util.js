import { redisClient } from '../app'
import { TENMINUTES } from '../Constants'
import { OtpService } from '../Services'
import { getUtcTime, addMinutes, getMinutesDiff } from './commonFunctions'
import { encrypt } from './crypt'

export const redisOperation = async (param, operation) => {
	return await new Promise((resolve, reject) => redisClient[operation](param, (err, data) => {
		if (err) {
			reject(err)
		} else {
			resolve(data)
		}
	}))
}

export const generateOtp = async (reference, referenceType, countryCode = '', source, no_digits = 4) => {

	if (no_digits <= 0 || no_digits > 10) {
		throw new Error('Number of digits should be between 1 and 10.')
	}

	const min = 10 ** (no_digits - 1)
	const max = 10 ** no_digits - 1

	const preOtp = Math.floor(Math.random() * (max - min + 1)) + min
	const otp = preOtp.toString().padStart(no_digits, '0')

	await OtpService.create({ reference: encrypt(reference + countryCode), referenceType, source, otp, otpExpiresAt: addMinutes(getUtcTime(), TENMINUTES) })
	return otp
}

export const verifyOtp = async (reference, referenceType, countryCode = '', source, otp) => {
	const currentTime = getUtcTime()
	reference = encrypt(reference + countryCode)

	const otpData = await OtpService.getOne({ reference, referenceType, otp, source, verified: false })

	if (otpData && (0 < getMinutesDiff(currentTime, otpData.otpExpiresAt) < TENMINUTES)) {
		await OtpService.updateMany({ reference, referenceType, source }, { verified: true })
		return true
	} else {
		return false
	}
}

export const deleteOtp = async (reference, referenceType, countryCode = '') => {
	reference = encrypt(reference + countryCode)
	await OtpService.deleteMany({ reference, referenceType, verified: true })
}

export const sendWhatsappMessage = async (reference, message) => {
	return true
}

export const sendEmail = async (reference, message) => {
	return true
}