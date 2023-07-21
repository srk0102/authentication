import { UserRouter } from './userAuth'
import { UserMessage } from './userMessage'

import { Logger } from '../Utils'

const Routes = [
	{ path: '/user', router: UserRouter },
	{ path: '/message', router: UserMessage }
]

Routes.init = (app) => {
	try {
		Routes.forEach(route => {
			app.use(['/auth', route.path].join(''), route.router)
		})
	}
	catch (err) {
		Logger.error(err)
	}
}

export { Routes }