import mongoose, { Schema } from 'mongoose';

const LogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  transcription: { type: String, required: true },
  timestamp: { type: Number, required: true },
  location: {
    lat: Number,
    lng: Number
  }
}, { timestamps: true });

export default mongoose.model('Log', LogSchema);
