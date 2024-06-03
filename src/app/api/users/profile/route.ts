import { DBUSER } from "@/app/Interface/Interface";
import { connectToDb } from "@/app/db_config/connectDb";
import { verifyJwtToken } from "@/app/helper/verify_user";
import { userModel } from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectToDb();

export async function GET(req: NextRequest) {
  try {
    // ----> Extract data from token <-----------
    const userId = await verifyJwtToken(req);
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Unable to get userId",
      });
    }
    const user = userModel.findById(userId);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "No User found with the following userId",
      });
    }
    return NextResponse.json({
      success: true,
      message: "User Found",
      user,
    });
  } catch (error) {
    NextResponse.json({
      success: false,
      message: "error while trying get user info",
    });
  }
}
