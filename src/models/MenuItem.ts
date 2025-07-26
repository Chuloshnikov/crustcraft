import { model, models, Schema, Document, Types, Date } from "mongoose";

export interface IExtraPrice {
  _id?: string;
  name: string;
  price: number;
}

export interface IMenuItem extends Document {
  _id: string;
  image: string;
  name: string;
  description: string;
  popular?: boolean;
  category: Types.ObjectId;
  basePrice: number;
  sizes?: IExtraPrice[];
  extraIngredients?: IExtraPrice[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ExtraPriceSchema = new Schema<IExtraPrice>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const MenuItemSchema = new Schema<IMenuItem>(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' }, 
    basePrice: { type: Number, required: true },
    sizes: { type: [ExtraPriceSchema], default: [] },
    extraIngredients: { type: [ExtraPriceSchema], default: [] },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model<IMenuItem>("MenuItem", MenuItemSchema);