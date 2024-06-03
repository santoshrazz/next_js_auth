import { connectToDb } from "@/app/db_config/connectDb";
import { NextRequest, NextResponse } from "next/server";
connectToDb();
async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "logout successfully",
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
    });
    response.cookies.set("isLoggedIn", "true");
    return response;
  } catch (error) {
    NextResponse.json({
      success: false,
      message: "error while trying to logout",
    });
  }
}
