import { APP_NAME } from '../Config'

import { UserRouter } from './userAuth'
import { UserProfileRouter } from './userProfile'

import { Logger } from '../Utils'

const Routes = [
	{ path: '/user', router: UserRouter },
	{ path: '/user-profile', router: UserProfileRouter },
]

Routes.init = (app) => {
	try {
		Routes.forEach(route => {
			app.use([`/${APP_NAME}`, route.path].join(''), route.router)
		})
	}
	catch (err) {
		Logger.error(err)
	}
}

export { Routes }