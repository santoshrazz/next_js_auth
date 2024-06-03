import { connectToDb } from "@/app/db_config/connectDb";
import { userModel } from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectToDb();
export async function POST(req: NextRequest) {
  try {
    // ------------> Receiving data from req.body <------------
    const requestBody = await req.json();
    const { token } = requestBody;

    // ------------> Validate if no token found <------------

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Token not found",
      });
    }
    // ------------> Finding user based on token <------------
    const user = await userModel.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    // ------------> Checking if no user present <------------
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Email verification fail",
      });
    }
    // ------------> Setting verification details and saving user <------------
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
