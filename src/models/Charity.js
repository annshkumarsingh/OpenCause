import mongoose from "mongoose";

const CharitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  website: { type: String, required: true },
  img: { type: String },
  category: { type: String },
  verified: { type: Boolean, default: false },
  region: { type: String },
  donationsReceived: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Charity || mongoose.model("Charity", CharitySchema);