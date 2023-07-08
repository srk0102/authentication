import { Router } from 'express'

import { login, signup } from '../Controllers'
import { userSignup, userLogin } from '../validations'
import { asyncWrapper, validateInput } from '../Utils'

export const UserRouter = Router()

UserRouter.post('/signup', validateInput(userSignup), asyncWrapper(signup))
UserRouter.post('/login', validateInput(userLogin), asyncWrapper(login))