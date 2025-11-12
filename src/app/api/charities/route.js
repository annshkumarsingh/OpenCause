import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbconnect";
import Charity from "@/models/Charity"


// GET all filtered charities
export async function GET(req) {
  try {

    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const filter = {};

    if(search){
      filter.$or = [
        {title: { $regex: search, $options: "i" }},
        {desc: { $regex: search, $options: "i" }}
      ]
    }

    if (category && category !== "") {
      filter.category = category;
    }

    if (status && status === "Verified Causes") {
      filter.verified = true;
    }

    const totalCharities = await Charity.countDocuments(filter);
    const totalPages = Math.ceil(totalCharities/limit);

    const charities = await Charity.find(filter)  
      .skip((page-1)*limit) // Number of charities to skip
      .limit(limit)
      .sort({ verified: -1, createdAt: -1 }); // Sort in descending order

    return NextResponse.json({
      charities,
      totalPages
    });

  } catch (error) {
    console.error("Error fetching charities:", error);
    return NextResponse.json({ message: "Failed to load charities" }, {status: 500});
  }
}

// POST new charity
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newCharity = await Charity.create(body);
    return NextResponse.json(newCharity, { status: 201 });
  } catch (error) {
    console.error("Error posting the charity:", error);
    return NextResponse.json({ message: "Failed to save the charity" }, { status: 500 });
  }
}
