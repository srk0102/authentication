import { model, Schema } from 'mongoose'

const userSchema = new Schema({
	phone: {
		type: Number,
		require: true
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	userName: {
		type: String
	},
	whatsappComm: {
		type: Boolean,
		default: false
	},
	emailComm: {
		type: Boolean,
		default: false
	}
},
{
	timestamps: { createdAt: true, updatedAt: true }
}
)

userSchema.index({ phone: 1,  email: 1})

export const USER = model('user', userSchema)