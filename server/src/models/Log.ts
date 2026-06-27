import mongoose, { Schema } from 'mongoose';

const LogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  farmerId: { type: Schema.Types.ObjectId, ref: 'Farmer' },
  type: { type: String, enum: ['sale', 'purchase', 'credit'], required: true },
  amount: { type: Number, required: true },
  item: { type: String, required: true },
  transcription: { type: String, required: true },
  timestamp: { type: Number, required: true },
  source: { type: String, enum: ['app', 'sms', 'ussd'], default: 'app' },
  location: {
    lat: Number,
    lng: Number
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  }
}, { timestamps: true });

export default mongoose.model('Log', LogSchema);
