import {model, models, Schema} from "mongoose";
import { CartProduct } from "../../types/cart";

export interface AddressTypes {
phone: string;
address: string;
}

export interface IOrder extends Document {
  userEmail: string,
  address: AddressTypes,
  cartProducts: CartProduct,
  paid: boolean,
};


const OrderSchema = new Schema({
  userEmail: String,
  phone: String,
  address: Object,
  cartProducts: Object,
  paid: {type: Boolean, default: false},
}, {timestamps: true});

export const Order = models?.Order || model('Order', OrderSchema);