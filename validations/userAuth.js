import Joi from 'joi'

import { commonValidation } from './utils'

export const userSignup = {
	body: Joi.object({
		email: commonValidation.email.required(),
		userName: commonValidation.fullName.required(),
		source: commonValidation.source.required(),
		password: commonValidation.password.required()
	})
}

export const userLogin = {
	body: Joi.object({
		email: commonValidation.email.required(),
		password: commonValidation.password.required(),
	})
}

export const userPassword = {
	body: Joi.object({
		password: commonValidation.password.required()
	})
}