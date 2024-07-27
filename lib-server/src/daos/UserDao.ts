import mongoose, { Schema, Document,model } from 'mongoose';
import { IUser } from '../models/User'; 

export interface IUserModel extends IUser, Document {};

const UserSchema: Schema = new Schema({
    userType: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{
    versionKey:false
});

const User = model<IUserModel>('User', UserSchema);

export default User;