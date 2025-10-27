import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { imageId, feeling } = await req.json();

  const scriptUrl = "https://script.google.com/macros/s/AKfycbzZWYSEl6bFMBKaSKk7qyruK08sP7igdPMO6m0shcSgZdiYW0wNqPtAYlN_HscFNrmlRw/exec";

  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageId,
      feeling,
      timestamp: new Date().toISOString(),
    }),
  });

  if (response.ok) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
