import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return new Response("Not found", { status: 404 });
}

export async function POST(req: NextRequest) {
  return new Response("Not found", { status: 404 });
}