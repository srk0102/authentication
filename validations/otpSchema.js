import Joi from 'joi'

import { commonValidation } from './utils'

export const sendOtpSchema = {
	body: Joi.object({
		reference: commonValidation.reference,
		referenceType: commonValidation.referenceType.required(),
		countryCode: commonValidation.countryCodeWithReferenceTypeContactNo,
	}).custom((value, helper) => {
		if (['+91', '91'].includes(value.countryCode) && value.reference.toString().length !== 10 && value.referenceType == 'contactno') {
			return helper.message('Contact number should be 10 numbers')
		}
		if (value.referenceType == 'email' && value.countryCode) {
			return helper.message('\\"countryCode\\" is not allowed')
		}
		return value
	})
}

export const validateOtpSchema = {
	body: Joi.object({
		otp: commonValidation.otp,
		source: commonValidation.source,
		referenceType: commonValidation.referenceType.default('contactno'),
		reference: commonValidation.reference,
		countryCode: commonValidation.countryCode,
	}).custom((value, helper) => {
		if (new RegExp(/^\d+$/).test(value.reference) && !value.countryCode) {
			return helper.message('/countryCode/ is required')
		}
		return value
	})
}