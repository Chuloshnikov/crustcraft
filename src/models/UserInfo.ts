import {model, models, Schema} from "mongoose";

export interface IUserInfo extends Document {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  admin: boolean;
}


const UserInfoSchema = new Schema({
  email: {type: String, required: true},
  firstName: {type: String},
  lastName: {type: String},
  avatarUrl: {type: String},
  dateOfBirth: {type: String},
  address: {type: String},
  phone: {type: String},
  admin: {type: Boolean, default: false},
}, {timestamps: true});

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);