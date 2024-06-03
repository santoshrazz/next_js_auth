import { userModel } from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { DBUSER } from "@/app/Interface/Interface";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  try {
    const requestbody = await req.json();
    const { email, password, username } = requestbody;

    // ---------> Check for basic validation <--------------
    if (!email || (!username && !password)) {
      return NextResponse.json({
        success: false,
        message: "Incomplete information to login",
      });
    }
    // ---------> Finding user on the basis of email or username <--------------
    const user: DBUSER[] = await userModel.find({
      $or: [{ email: email }, { username: username }],
    });
    console.log(user);
    // ---------> Check if no user exist <--------------
    if (user.length === 0) {
      return NextResponse.json({
        success: false,
        message: "no account found please create an account",
      });
    }

    // ---------> Checking user password <--------------
    const isPasswordValid = await bcryptjs.compare(password, user[0].password);
    console.log(!isPasswordValid);
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: "Invalid user credentials",
      });
    }

    // ---------> Generating JWT Tokens <--------------
    const payload = {
      userId: user[0]._id,
    };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // ---------> Setting Response <--------------
    const response = NextResponse.json({
      success: true,
      message: "User Logged in",
    });
    response.cookies.set("token", jwtToken, {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 86400000,
    });
    response.cookies.set("isLoggedIn", "true");
    return response;
  } catch (error: any) {
    console.log(`Error occured while logging in user`, error.message);
  }
}
