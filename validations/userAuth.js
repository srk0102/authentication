import Joi from 'joi'

import { commonValidation } from './utils'

export const userSignup = {
	body: Joi.object({
		countryCode: commonValidation.countryCode.required(),
		phone: commonValidation.contactNo.required(),
		email: commonValidation.email,
		password: commonValidation.password.required(),
		userName: commonValidation.fullName.required(),
		userType: commonValidation.userType.required(),
		gender: commonValidation.gender,
		otp: commonValidation.otp.required(),
		whatsappComm: Joi.boolean().default(false),
		emailComm: Joi.boolean().default(false),
	})
}

export const userLogin = {
	body: Joi.object({
		phone: commonValidation.emailOrPhone.required(),
		password: commonValidation.password.required(),
	})
}
