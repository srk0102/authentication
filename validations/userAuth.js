import Joi from 'joi'

import { commonValidation } from './utils'

export const userSignup = {
	body: Joi.object({
		phone: commonValidation.contactNo.required(),
		email: commonValidation.email,
		password: commonValidation.password.required(),
		userName: commonValidation.fullName,
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
