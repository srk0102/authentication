import Joi from 'joi'

import { commonValidation } from './utils'

export const profileUpdateValidation = {
	body: Joi.object({
		userName: commonValidation.fullName,
	})
}