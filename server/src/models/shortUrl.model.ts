import mongoose, { Document } from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuv0987654321", 6);

export interface ShortURL extends Document {
  shortId: string;
  destination: string;
  timestamp: Date;
}

const schema = new mongoose.Schema({
  shortId: {
    type: String,
    unique: true,
    required: true,
    default: () => nanoid(),
  },
  clicks: { type: Number, required: true, default: 0 },
  destination: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
});

const shortUrl = mongoose.model<ShortURL>("shortUrl", schema);

export default shortUrl;
