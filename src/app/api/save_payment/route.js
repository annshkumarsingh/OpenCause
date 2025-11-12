import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbconnect";
import Payment from "@/models/Payment";

export async function POST(req) {
  try {
    const body = await req.json();
    const { to_charity, amount, sender_email, sender_name, oid } = body;

    if (!to_charity || !amount || !sender_email || !sender_name || !oid) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();
    const payment = await Payment.create({
      sender_name,
      sender_email,
      to_charity,
      amount,
      oid,
    });

    return NextResponse.json({ success: true, payment });
  } catch (err) {
    console.error("Error saving payment:", err);
    return NextResponse.json({ error: "Error saving payment" }, { status: 500 });
  }
}
