import { Router } from 'express'

import { updateProfile, getUserDetails } from '../Controllers'
import { profileUpdateValidation } from '../validations'
import { asyncWrapper, validateInput } from '../Utils'
import { verifyToken } from '../Middlewares'

export const UserProfileRouter = Router()

UserProfileRouter.get('/', verifyToken, asyncWrapper(getUserDetails))
UserProfileRouter.post('/update-details', verifyToken, validateInput(profileUpdateValidation), asyncWrapper(updateProfile))