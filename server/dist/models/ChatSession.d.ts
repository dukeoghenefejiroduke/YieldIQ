import mongoose, { Document } from 'mongoose';
export interface IChatSession extends Document {
    userId: string;
    messages: {
        role: 'user' | 'assistant';
        content: string;
    }[];
    createdAt: Date;
}
export declare const ChatSession: mongoose.Model<IChatSession, {}, {}, {}, mongoose.Document<unknown, {}, IChatSession, {}, mongoose.DefaultSchemaOptions> & IChatSession & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IChatSession>;
//# sourceMappingURL=ChatSession.d.ts.map