import mongoose, { Schema } from 'mongoose';
const ChatSessionSchema = new Schema({
    userId: { type: String, required: true },
    messages: [{ role: String, content: String }],
    createdAt: { type: Date, default: Date.now }
});
export const ChatSession = mongoose.model('ChatSession', ChatSessionSchema);
//# sourceMappingURL=ChatSession.js.map