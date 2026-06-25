import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    name: string;
    members: mongoose.Types.ObjectId[];
    totalCreditScore: number;
    description?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    members: mongoose.Types.ObjectId[];
    totalCreditScore: number;
    description?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    members: mongoose.Types.ObjectId[];
    totalCreditScore: number;
    description?: string | null;
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
    members: mongoose.Types.ObjectId[];
    totalCreditScore: number;
    description?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    members: mongoose.Types.ObjectId[];
    totalCreditScore: number;
    description?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    name: string;
    members: mongoose.Types.ObjectId[];
    totalCreditScore: number;
    description?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    members: mongoose.Types.ObjectId[];
    totalCreditScore: number;
    description?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    members: mongoose.Types.ObjectId[];
    totalCreditScore: number;
    description?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Cooperative.d.ts.map