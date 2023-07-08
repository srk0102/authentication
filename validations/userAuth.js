import Joi from 'joi'

import { commonValidation } from './utils'

export const userSignup = {
	body: Joi.object({
		phone: commonValidation.contactNo.required(),
		email: commonValidation.email.required(),
		password: commonValidation.password.required(),
		userName: commonValidation.fullName.required(),
		whatsappComm: Joi.boolean().required(),
		emailComm: Joi.boolean().required(),
	})
}

export const userLogin = {
	body: Joi.object({
		emailOrPhone: commonValidation.emailOrPhone.required(),
		password: commonValidation.password.required(),
	})
}
