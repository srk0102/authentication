import { model, Schema } from 'mongoose'

import { REFERENCE_TYPE } from '../Constants'

const otpSchema = new Schema({
	reference: {
		type: String,
		required: true
	},
	referenceType: {
		type: String,
		required: true,
		enum: REFERENCE_TYPE
	},
	otp: {
		type: String,
		required: true
	},
	otpExpiresAt: {
		type: Date,
		require: true
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

otpSchema.index({ reference: 1 })

export const OTP = model('otp', otpSchema)

