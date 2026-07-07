import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    farmerId: mongoose.Types.ObjectId;
    timestamp: NativeDate;
    cooperativeId: mongoose.Types.ObjectId;
    content: string;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    farmerId: mongoose.Types.ObjectId;
    timestamp: NativeDate;
    cooperativeId: mongoose.Types.ObjectId;
    content: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    farmerId: mongoose.Types.ObjectId;
    timestamp: NativeDate;
    cooperativeId: mongoose.Types.ObjectId;
    content: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    farmerId: mongoose.Types.ObjectId;
    timestamp: NativeDate;
    cooperativeId: mongoose.Types.ObjectId;
    content: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    farmerId: mongoose.Types.ObjectId;
    timestamp: NativeDate;
    cooperativeId: mongoose.Types.ObjectId;
    content: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    farmerId: mongoose.Types.ObjectId;
    timestamp: NativeDate;
    cooperativeId: mongoose.Types.ObjectId;
    content: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    farmerId: mongoose.Types.ObjectId;
    timestamp: NativeDate;
    cooperativeId: mongoose.Types.ObjectId;
    content: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    farmerId: mongoose.Types.ObjectId;
    timestamp: NativeDate;
    cooperativeId: mongoose.Types.ObjectId;
    content: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=CommunityPost.d.ts.map