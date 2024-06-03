import { NextRequest } from "next/server";

async function GET(req: NextRequest) {
  try {
    req.cookies.clear();
  } catch (error) {}
}
