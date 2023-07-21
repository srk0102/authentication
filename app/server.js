import express, { json } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieSession from 'cookie-session'
import bodyParser from 'body-parser'

import { FE_URL, COMPANY_NAME } from '../Config'

import { Routes } from '../Routes'
import { sendResponse, Logger } from '../Utils'

export const InitializeApp = () => {

	const app = express()

	// set security HTTP headers
	app.use(helmet())

	app.use(bodyParser.json())

	//middleWares
	app.use(json())

	app.use(cors({
		origin: FE_URL,
		methods: 'GET,POST,PUT,DELETE',
		credentials: true,
	}))

	app.use(
		cookieSession({
			name: 'session',
			keys: [COMPANY_NAME],
			maxAge: 24 * 60 * 60 * 100,
		})
	)

	Routes.init(app)

	app.use('/check', (req, res) => {
		return sendResponse(res, SUCCESS, 'App working fine 🤗', {}, '')
	})

	app.use((req, res, next) => {
		Logger.error('Page Not Found 🤗')
		return sendResponse(res, NOTFOUND, '', {}, 'Page Not Found 🚫')
	})

	return app
}