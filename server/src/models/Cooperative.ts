import mongoose, { Schema } from 'mongoose';

const CooperativeSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'Farmer' }],
  totalCreditScore: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Cooperative', CooperativeSchema);
