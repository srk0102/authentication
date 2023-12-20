import { model, Schema } from 'mongoose'

import { TOKEN_STATUS } from '../Constants'

const tokenSchema = new Schema({
	userId: {
		type: String,
		require: true
	},
	token: {
		type: String,
		required: true
	},
	refreshtoken: {
		type: String,
		required: true
	},
	tkExpiresAt: {
		type: Date,
		require: true
	},
	rtkExpiresAt:{
		type: Date,
		require: true
	},
	status:{
		type: String,
		enum: TOKEN_STATUS,
		default: 'active'
	}
},
{
	timestamps: { createdAt: true, updatedAt: true }
}
)

tokenSchema.index({ userId: 1 })

export const TOKEN = model('token', tokenSchema)

