import mongoose, { Schema, Document } from 'mongoose';

export interface IChatSession extends Document {
  userId: string;
  messages: { role: 'user' | 'assistant'; content: string }[];
  createdAt: Date;
}

const ChatSessionSchema = new Schema({
  userId: { type: String, required: true },
  messages: [{ role: String, content: String }],
  createdAt: { type: Date, default: Date.now }
});

export const ChatSession = mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);
