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
    const jwtResponse: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!jwtResponse) {
      return NextResponse.json({
        success: false,
        message: "User verification failed",
      });
    }
    return jwtResponse.userId;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
