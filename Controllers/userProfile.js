
import { Logger, sendResponse } from '../Utils'
import { UserService } from '../Services'
import { Types } from 'mongoose'

export const updateProfile = async (req, res) => {
	try {
		const { userName } = req.body
		const updatedUser = await UserService.updateOne({ _id: new Types.ObjectId(res.locals.userId) }, { userName })
		return sendResponse(res, SUCCESS, 'Your information has been refined and is now ready to reflect the best version of you! 🌟🚀', updatedUser)
	}
	catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, 'Update Failed', {}, err.message)
		throw err
	}
}

export const getUserDetails = async (req, res) => {
	try {
		const userDetails = await UserService.getOne({ _id: new Types.ObjectId(res.locals.userId) }, { _id: false, password: false, __v: false, source: false })
		if (!userDetails) {
			return sendResponse(res, NOTFOUND, '', {}, 'Uh-oh! It appears you are not registered with us')
		}
		return sendResponse(res, SUCCESS, '', userDetails)
	}
	catch (err) {
		Logger.error(err.message)
		sendResponse(res, INTERNALSERVERERROR, 'Update Failed', {}, err.message)
		throw err
	}
}