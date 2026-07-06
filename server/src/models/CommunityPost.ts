import mongoose, { Schema } from 'mongoose';

const CommunityPostSchema = new Schema({
  cooperativeId: { type: Schema.Types.ObjectId, ref: 'Cooperative', required: true },
  farmerId: { type: Schema.Types.ObjectId, ref: 'Farmer', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('CommunityPost', CommunityPostSchema);
