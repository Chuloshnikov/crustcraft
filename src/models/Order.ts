import {model, models, Schema} from "mongoose";
import { CartProduct } from "../../types/cart";


export interface IOrder extends Document {
  _id?: string,
  userEmail: string,
  phone: string;
  address: string,
  cartProducts: CartProduct[],
  paid: boolean,
  createdAt?: Date,
  updatedAt?: Date,
};


const OrderSchema = new Schema({
  userEmail: String,
  phone: String,
  address: Object,
  cartProducts: Object,
  paid: {type: Boolean, default: false},
}, {timestamps: true});

export const Order = models?.Order || model('Order', OrderSchema);