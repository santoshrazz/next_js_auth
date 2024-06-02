import { connectToDb } from "@/app/db_config/connectDb";
import { sendMail } from "@/app/helper/sendmail";
import { userModel } from "@/app/models/user.model";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    // ----------> Receiving data from req-body <----------------
    const requestBody = await req.json();
    const { username, email, password } = requestBody;
    console.log(requestBody);

    // ----------> Check for basic validation <----------------

    if (!username || !email || !password) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "No Require information provided",
      });
    }
    // ----------> Check if user already exists <----------------
    const isUserExists = await userModel.find({
      $or: [{ email: email }, { username: username }],
    });
    console.log(isUserExists);
    if (isUserExists.length > 0) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "User already exist",
      });
    }

    // ----------> Encrypting password <----------------
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // ----------> Creating user <----------------
    console.log(
      `User that we have to create is `,
      username,
      hashedPassword,
      email
    );

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const mailResponse = await sendMail({
      email: email,
      mailType: "VERIFY",
      userId: newUser._id,
    });
    console.log(mailResponse);
    return NextResponse.json({
      status: 200,
      success: true,
      message: "User Created",
    });
  } catch (error: any) {
    console.log(`Error while creating user`, error.message);
  }
}
