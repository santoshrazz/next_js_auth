import { userModel } from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { token } = requestBody;
    console.log(`VerifyToken is `, token);
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Token not found",
      });
    }
    const user = await userModel.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now },
    });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Email verification fail",
      });
    }
    user.isverified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      success: true,
      message: "Email Verified",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
