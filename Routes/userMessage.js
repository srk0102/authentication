import { Router } from 'express'

import { sendOtp, validateOtp } from '../Controllers'
import { sendOtpSchema, verifyOtpSchema } from '../validations'
import { asyncWrapper, validateInput } from '../Utils'

export const UserMessage = Router()

UserMessage.post('/send-otp', validateInput(sendOtpSchema), asyncWrapper(sendOtp))
UserMessage.post('/verify-otp', validateInput(verifyOtpSchema), asyncWrapper(validateOtp))