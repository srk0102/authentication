import { model, Schema } from 'mongoose'

import { ENTRY_TYPE } from '../Constants'

const editorSchema = new Schema({
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
	verified: {
		type: Boolean,
		default: false
	},
	description: {
		type: String
	},
	links: {
		type: Array
	},
	emailComm: {
		type: Boolean,
		default: true,
		required: true
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

editorSchema.index({ email: 1 })

export const EDITOR = model('editor', editorSchema)