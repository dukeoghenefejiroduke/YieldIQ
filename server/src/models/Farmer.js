import mongoose, { Schema } from 'mongoose';

const FarmerSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  creditScore: { type: Number, default: 0 },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cooperativeId: { type: Schema.Types.ObjectId, ref: 'Cooperative' }
}, { timestamps: true });

export default mongoose.model('Farmer', FarmerSchema);
