import {model, models, Schema} from "mongoose";

export interface IUserInfo extends Document {
  email: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  admin: boolean;
}


const UserInfoSchema = new Schema({
  email: {type: String, required: true},
  streetAddress: {type: String},
  postalCode: {type: String},
  city: {type: String},
  country: {type: String},
  phone: {type: String},
  admin: {type: Boolean, default: false},
}, {timestamps: true});

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);