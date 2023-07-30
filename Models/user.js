import { model, Schema } from 'mongoose'
import { USER_TYPE, GENDER } from '../Constants'

const userSchema = new Schema({
	phone: {
		type: Number,
		required: true
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	userType: {
		type: String,
		enum:  USER_TYPE,
		required: true
	},
	gender:{
		type: String,
		enum: GENDER,
		default: 'prefer not to say'
	},
	userName: {
		type: String,
		required: true,
	},
	whatsappComm: {
		type: Boolean,
		default: false
	},
	emailComm: {
		type: Boolean,
		default: false
	},
	verified: {
		type: Boolean,
		default: false
	}
},
{
	timestamps: { createdAt: true, updatedAt: true }
}
)

userSchema.index({ phone: 1, email: 1 })

export const USER = model('user', userSchema)