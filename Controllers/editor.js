import axios from 'axios'

import { generateToken, generateSignUpToken, decryptValidateToken } from '../Middlewares'
import { Logger, sendResponse, encrypt, compare } from '../Utils'
import { EditorService } from '../Services'
import { NODE_ENV, MAILING_SERVICE, EDITOR_FE_URL } from '../Config'
import { VALIDATION_TOKENS, EMAIL_TEMPLATE_KEYS } from '../Constants'
import { Types } from 'mongoose'

export const editorSignup = async (req, res) => {
	try {
		const { userName, password, email, profilePic, contentPlatforms, emailComm, country, description } = req.body
		const existingUser = await EditorService.getOne({ email })
		if (existingUser) {
			return sendResponse(res, FORBIDDEN, '', { existingUser }, `Welcome back ${existingUser.userName}! Let's get you logged in!`)
		}
		const encryptedPassword = encrypt(password)
		const newUser = await EditorService.create({ email, password: encryptedPassword, userName, profilePic, contentPlatforms, description, emailComm, country, entryType: 'general' })
		const verificationLink = await generateSignUpToken({ userId: newUser._id, source: VALIDATION_TOKENS.emailVerification }, 'editor')
		const mailOptions = {
			to: email,
			source: EMAIL_TEMPLATE_KEYS.verifyEmail,
			subject: `verification email from ${COMPANYNAME}`,
			body: {
				userName,
				verificationLink
			}
		}

		axios.post(MAILING_SERVICE.WELCOME, { to: email, userName })
		await axios.post(MAILING_SERVICE.SOURCE_EMAIL, mailOptions)

		return sendResponse(res, SUCCESS, 'Check your registered email for a magical message! 💌 Verify within 24 hours. 🕒✨', {}, '')
	}
	catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, 'oops! Signup failed', {}, err.message)
		throw err
	}
}

export const editorVerifyEmail = async (req, res) => {
	try {
		const { token } = req.params
		const { userId, source } = decryptValidateToken(token)

		if (source !== VALIDATION_TOKENS.emailVerification) {
			return sendResponse(res, UNAUTHORIZED, 'Sorry, Access Denied.', { token }, '')
		}
		await EditorService.updateOne({ _id: new Types.ObjectId(userId) }, { verified: true })
		return res.status(301).redirect(`${EDITOR_FE_URL}/login`)
	} catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, 'oops! Verification failed', {}, err.message)
		throw err
	}
}

export const editorRequestVerificationEmail = async (req, res) => {
	try {
		const { email } = req.body
		const existingUser = await EditorService.getOne({ email })
		if (!existingUser) {
			return sendResponse(res, UNAUTHORIZED, '', {}, 'Apologies, we couldn\'t find your record in our registry.')
		}

		const token = await generateSignUpToken({ userId: newUser._id, source: VALIDATION_TOKENS.emailVerification })

		return sendResponse(res, SUCCESS, 'Guard your account: Confirm your email within 24 hours, or risk losing it.', { token }, '')

	} catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, 'oops! request failed', {}, err.message)
		throw err
	}
}

export const editorLogin = async (req, res) => {
	try {
		const { email, password } = req.body
		const existingUser = await EditorService.getOne({ email })
		if (!existingUser) {
			return sendResponse(res, UNAUTHORIZED, '', {}, 'Apologies, we couldn\'t find your record in our registry.')
		}
		if (!existingUser.verified) {
			return sendResponse(res, UNAUTHORIZED, '', {}, 'Kindly verify your email before logging in.')
		}
		const checkUser = compare(existingUser.password, password)
		if (!checkUser) {
			return sendResponse(res, UNAUTHORIZED, '', {}, 'Oops! Wrong Password - Let\'s Try That Again!')
		}
		const token = await generateToken({ userId: existingUser._id, source: existingUser.source })

		res.cookie('token', token.token, {
			httpOnly: true,
			secure: NODE_ENV === 'prod',
		})
	} catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, 'Login failed', {}, err.message)
		throw err
	}
}