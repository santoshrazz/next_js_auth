import { userModel } from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: NextRequest) {
  try {
    const requestbody = await req.json();
    const { email, password, username } = requestbody;
    if (!email || (!username && !password)) {
      return NextResponse.json({
        success: false,
        message: "Incomplete information to login",
      });
    }
    const user = await userModel.find({
      $or: [{ email: email }, { username: username }],
    });
    if (user.length === 0) {
      return NextResponse.json({
        success: false,
        message: "no account found please create an account",
      });
    }
  } catch (error) {}
}
