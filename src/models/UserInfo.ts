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
};


const UserInfoSchema = new Schema({
  email: {type: String, required: true},
  firstName: {type: String, default: "first name" },
  lastName: {type: String, default: "first name"},
  avatarUrl: {type: String, default: ""},
  dateOfBirth: {type: String, default: "1900-05-15"},
  address: {type: String, default: "unknown"},
  phone: {type: String, default: "unknown"},
  admin: {type: Boolean, default: false},
}, {timestamps: true});

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);