import { NextResponse } from "next/server";
import { sendContactEmail } from "@/utils/mailUtil";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await sendContactEmail(name, email, message);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
