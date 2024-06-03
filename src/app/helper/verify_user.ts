import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function verifyJwtToken(req: NextRequest) {
  try {
    const tokenCookie = req.cookies.get("token");
    if (!tokenCookie) {
      return NextResponse.json({
        success: false,
        message: "No token found",
      });
    }
    const token = tokenCookie.value;
    const jwtResponse = jwt.verify(token, process.env.JWT_SECRET!);
    if (!jwtResponse) {
      return NextResponse.json({
        success: false,
        message: "User verification failed",
      });
    }
    console.log(jwtResponse);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
