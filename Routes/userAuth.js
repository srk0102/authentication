import { Router } from 'express'

import { login, signup, verifyAuth, reqSetPassword, resetPassword, verifyEmail } from '../Controllers'
import { userSignup, userLogin, userPassword, userReqPassword } from '../validations'
import { asyncWrapper, validateInput } from '../Utils'
import { verifyToken } from '../Middlewares'

export const UserRouter = Router()

UserRouter.post('/signup', validateInput(userSignup), asyncWrapper(signup))
UserRouter.get('/verify-email/:token', asyncWrapper(verifyEmail))
UserRouter.post('/login', validateInput(userLogin), asyncWrapper(login))

UserRouter.post('/set-password/', validateInput(userReqPassword), asyncWrapper(reqSetPassword))
UserRouter.post('/reset-password/:token', validateInput(userPassword), asyncWrapper(resetPassword))

UserRouter.get('/verify-auth', verifyToken, asyncWrapper(verifyAuth))