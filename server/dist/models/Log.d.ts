import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    transcription: string;
    timestamp: number;
    location?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    transcription: string;
    timestamp: number;
    location?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    transcription: string;
    timestamp: number;
    location?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    userId: mongoose.Types.ObjectId;
    transcription: string;
    timestamp: number;
    location?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    transcription: string;
    timestamp: number;
    location?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    transcription: string;
    timestamp: number;
    location?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    userId: mongoose.Types.ObjectId;
    transcription: string;
    timestamp: number;
    location?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userId: mongoose.Types.ObjectId;
    transcription: string;
    timestamp: number;
    location?: {
        lat?: number | null;
        lng?: number | null;
    } | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Log.d.ts.map