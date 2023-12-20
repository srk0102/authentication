import { Router } from 'express'

import { editorSignup, editorVerifyEmail, editorRequestVerificationEmail, editorLogin } from '../Controllers'
import { editorUserSignup, userLogin, reqVerificationValidation } from '../validations'
import { asyncWrapper, validateInput } from '../Utils'

export const EditorRouter = Router()

EditorRouter.post('/signup', validateInput(editorUserSignup), asyncWrapper(editorSignup))
EditorRouter.post('/login', validateInput(userLogin), asyncWrapper(editorLogin))

EditorRouter.get('/verify-email/:token', asyncWrapper(editorVerifyEmail))
EditorRouter.post('/request-verification', validateInput(reqVerificationValidation), asyncWrapper(editorRequestVerificationEmail))