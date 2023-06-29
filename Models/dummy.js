import { model, Schema } from 'mongoose'

const dummySchema = new Schema({
  mobile: {
    type: Number,
    require: true
  },
  email: {
    type: String,
    require: true
  }
},
  {
    timestamps: { createdAt: true, updatedAt: true }
  }
)

dummySchema.index({ mobile: 1 })

export const Dummy = model('dummy', dummySchema)

