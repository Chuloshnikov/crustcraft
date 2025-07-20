import { IExtraPrice } from "@/models/MenuItem";
import { Types } from "mongoose";


export interface ClientMenuItem {
  _id: string;
  image: string;
  name: string;
  description: string;
  popular?: boolean;
  category: Types.ObjectId | string;
  basePrice: number;
  sizes: IExtraPrice[];
  extraIngredients: IExtraPrice[];
  createdAt: string;
  updatedAt: string;
}

export interface CartProduct extends ClientMenuItem {
  size?: IExtraPrice;
  extras?: IExtraPrice[];
}