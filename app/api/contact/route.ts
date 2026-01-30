import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {

  const { client } = await connectToDatabase();
  const db = client.db("");
  const col = db.collection("contact");
  const body = await request.json();
  const contact = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      date: new Date(),
    };

  try {
    await col.insertOne(contact)

    return NextResponse.json(
      {
        success: true,
        message: "Contact saved successfully",
      },
    );

  } catch (error) {
    console.error("Error Saving Contact")
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save contact",
      },
      { status: 500 }
    );
  }
}
