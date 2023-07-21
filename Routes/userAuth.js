import { Router } from 'express'

import { login, signup, verifyAuth } from '../Controllers'
import { userSignup, userLogin } from '../validations'
import { asyncWrapper, validateInput } from '../Utils'
import { verifyToken } from '../Middlewares'

export const UserRouter = Router()

UserRouter.post('/signup', validateInput(userSignup), asyncWrapper(signup))
UserRouter.post('/login', validateInput(userLogin), asyncWrapper(login))
UserRouter.get('/verify-auth', verifyToken, asyncWrapper(verifyAuth))