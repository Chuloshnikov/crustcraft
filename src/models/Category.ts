import { Schema, model, models } from "mongoose";

export interface ICategory extends Document {
    name: string;
}


const CategorySchema = new Schema({
    name: {type: String, required: true},
}, {timestamps: true});

export const Category = models?.Category || model('Category', CategorySchema);