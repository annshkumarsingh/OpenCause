import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  to_charity: {type: String, required: true},
  amount: {type: Number, required: true},
  sender_name: {type: String, required: true},
  sender_email: {type: String, required: true},
  oid: {type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);