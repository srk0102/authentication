import { Router } from 'express'

import { creatorSignup, creatorVerifyEmail, creatorRequestVerificationEmail, creatorLogin, logout } from '../Controllers'
import { userSignup, userLogin, reqVerificationValidation } from '../validations'
import { asyncWrapper, validateInput } from '../Utils'

export const CreatorRouter = Router()

CreatorRouter.post('/signup', validateInput(userSignup), asyncWrapper(creatorSignup))
CreatorRouter.post('/login', validateInput(userLogin), asyncWrapper(creatorLogin))

CreatorRouter.get('/verify-email/:token', asyncWrapper(creatorVerifyEmail))
CreatorRouter.post('/request-verification', validateInput(reqVerificationValidation), asyncWrapper(creatorRequestVerificationEmail))

CreatorRouter.post('/logout', asyncWrapper(logout))