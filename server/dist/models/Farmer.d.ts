import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    name: string;
    userId: mongoose.Types.ObjectId;
    location: string;
    phoneNumber: string;
    creditScore: number;
    cooperativeId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    userId: mongoose.Types.ObjectId;
    location: string;
    phoneNumber: string;
    creditScore: number;
    cooperativeId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    userId: mongoose.Types.ObjectId;
    location: string;
    phoneNumber: string;
    creditScore: number;
    cooperativeId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    userId: mongoose.Types.ObjectId;
    location: string;
    phoneNumber: string;
    creditScore: number;
    cooperativeId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    userId: mongoose.Types.ObjectId;
    location: string;
    phoneNumber: string;
    creditScore: number;
    cooperativeId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    name: string;
    userId: mongoose.Types.ObjectId;
    location: string;
    phoneNumber: string;
    creditScore: number;
    cooperativeId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    userId: mongoose.Types.ObjectId;
    location: string;
    phoneNumber: string;
    creditScore: number;
    cooperativeId?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    userId: mongoose.Types.ObjectId;
    location: string;
    phoneNumber: string;
    creditScore: number;
    cooperativeId?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Farmer.d.ts.map