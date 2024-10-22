import { Schema, model, Document } from "mongoose";

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  user: Schema.Types.ObjectId;
}

const contactSchema = new Schema<IContact>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export default model<IContact>("Contact", contactSchema);
