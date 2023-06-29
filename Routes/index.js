

import { Logger, sendResponse } from '../Utils'


const Routes = [
  // { path: '/manual-auth', router: manualRouter }
]

Routes.init = (app) => {
  try {
    Routes.forEach(route => {
      app.use(['/auth', route.path].join(''), route.router)
    })
    app.use((req, res, next) => {
      Logger.error('Page Not Found 🤗')
      return sendResponse(res, NOTFOUND, '', {}, 'Page Not Found 🤗')
    })
  }
  catch (err) {
    Logger.error(err)
  }
}

export { Routes }