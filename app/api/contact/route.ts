import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { client } = await connectToDatabase();
    const db = client.db("solvify");
    const col = db.collection("contacts");

    const result = await col.insertOne({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact saved successfully",
        id: result.insertedId,
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save contact",
      },
      { status: 500 }
    );
  }
}
