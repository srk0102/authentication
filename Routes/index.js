import { APP_NAME } from '../Config'

import { UserProfileRouter } from './userProfile'
import { CreatorRouter } from './creator'
import { EditorRouter } from './editor'

import { Logger } from '../Utils'

const Routes = [
	{ path: '/user-profile', router: UserProfileRouter },
	{ path: '/creator', router: CreatorRouter },
	{ path: '/editor', router: EditorRouter },
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