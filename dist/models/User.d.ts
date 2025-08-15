import mongoose, { Document } from 'mongoose';
export interface IUserDocument extends Document {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const _default: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument> & IUserDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=User.d.ts.map