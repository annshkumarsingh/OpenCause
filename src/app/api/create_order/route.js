import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount } = body;

    if (!amount) {
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
    });

    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
}
