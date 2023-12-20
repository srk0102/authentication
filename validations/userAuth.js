import Joi from 'joi'

import { commonValidation } from './utils'

export const userSignup = {
	body: Joi.object({
		email: commonValidation.email.required(),
		userName: commonValidation.fullName.required(),
		profilePic: commonValidation.profilePic,
		password: commonValidation.password.required(),
		emailComm: commonValidation.emailComm.required(),
		contentPlatforms: Joi.array(),
		country: commonValidation.country.required(),
		description: commonValidation.description
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

export const reqVerificationValidation = {
	body: Joi.object({
		email: commonValidation.email.required(),
	})
}