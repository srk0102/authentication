import { model, Schema } from 'mongoose'

import { ENTRY_TYPE } from '../Constants'

const creatorSchema = new Schema({
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
	profilePic: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	emailComm: {
		type: Boolean,
		default: true,
		required: true
	},
	verified: {
		type: Boolean,
		default: false
	},
	contentPlatforms: {
		type: Array,
	},
	TermsAndConditionsAndPrivacyAndPolicies: {
		type: Boolean,
		required: true,
		immutable: true,
		default: true
	},
	entryType: {
		type: String,
		enum: ENTRY_TYPE,
		required: true
	}
},
{
	timestamps: { createdAt: true, updatedAt: true }
}
)

creatorSchema.index({ email: 1 })

export const CREATOR = model('creator', creatorSchema)