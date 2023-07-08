import JoiBase from 'joi'
import JoiDate from '@joi/date'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import customParseFormat from 'dayjs/plugin/customParseFormat'

const Joi = JoiBase.extend(JoiDate) // extend Joi with Joi Date

import { REFERENCE_TYPE, PHONE_REGEX, COUNTRY_CODE_REGEX, DATEFORMAT, PASSWORD_REGEX } from '../Constants'

export const commonValidation = {
	reference: Joi.required().when('referenceType', { is: 'email', then: Joi.string().min(6).max(50).email(), otherwise: Joi.string().pattern(PHONE_REGEX) }),
	referenceType: Joi.string().lowercase().valid(...REFERENCE_TYPE),
	countryCode: Joi.string().pattern(COUNTRY_CODE_REGEX),
	countryCodeWithOtp: Joi.string().pattern(COUNTRY_CODE_REGEX).when('otp', {
		is: Joi.exist(), then: Joi.required(), otherwise: Joi.optional()
	}),
	countryCodeWithReferenceTypeContactNo: Joi.string().pattern(COUNTRY_CODE_REGEX).when('referenceType', { is: 'contactno', then: Joi.required(), otherwise: Joi.optional() }),
	otp: Joi.string().min(4).max(4),
	email: Joi.string().email(),
	fullName: Joi.string().min(1).max(75),
	contactNo: Joi.string().pattern(PHONE_REGEX),
	dob: Joi.date().format(DATEFORMAT).raw(),
	annualIncome: Joi.number().greater(1).less(50000000),
	source: Joi.string().lowercase().trim(),
	isWhatsappCommEnabled: Joi.boolean(),
	emailOrPhone: Joi.string().required(),
	password: Joi.string().min(8).max(16).pattern(PASSWORD_REGEX).message('password should contain at-least one capital letter, one small letter, one symbol and one number.The length of password should be in between 8-16.'),
	gender: Joi.string().trim().valid('Male', 'Female', 'Other'),
	profilePic: Joi.string().trim(),
	isActive: Joi.boolean(),
	startDate: Joi.string(),
	endDate: Joi.string(),
	limit: Joi.number().default(25).max(25),
	pageNo: Joi.number().default(1),
	memberId: Joi.string().required(),
	referralCode: Joi.string(),
	memberIds: Joi.array().min(1).required()
}

export const dobValidation = (dob) => {
	if (!dob) {
		return { isSuccess: true }
	}
	dayjs.extend(customParseFormat)
	if (!dayjs(dob, 'DD/MM/YYYY', true).isValid()) {
		return { isSuccess: false, message: 'Date of birth is invalid' }
	}
	let dobV = dob.split('/')
	let dobM = dayjs(`${dobV[2]}/${dobV[1]}/${dobV[0]}`).add(1, 'day')

	if (dayjs(dobM).isAfter(dayjs().subtract(18, 'year'))) {
		return { isSuccess: false, message: 'Your age must be greater then 18 years' }
	}

	if (dayjs(dobM).isBefore(dayjs().subtract(80, 'year'))) {
		return { isSuccess: false, message: 'Your age must be less then 80 years' }
	}

	dayjs.extend(isSameOrAfter)
	if (dayjs(dobM).isSameOrAfter(dayjs())) {
		return { isSuccess: false, message: 'Date of birth is invalid' }
	}
	return { isSuccess: true }
}