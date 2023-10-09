import { model, Schema } from 'mongoose'

const userSchema = new Schema({
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	userName: {
		type: String,
		required: true,
	},
	source: {
		type: String,
		required: true
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

userSchema.index({ source: 1, email: 1 })

export const USER = model('user', userSchema)