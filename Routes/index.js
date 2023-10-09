import { COMPANY_NAME } from '../Config'

import { UserRouter } from './userAuth'

import { Logger } from '../Utils'

const Routes = [
	{ path: '/user', router: UserRouter },
]

Routes.init = (app) => {
	try {
		Routes.forEach(route => {
			app.use([`/${COMPANY_NAME}`, route.path].join(''), route.router)
		})
	}
	catch (err) {
		Logger.error(err)
	}
}

export { Routes }