import { NextResponse, type NextRequest } from "next/server";

// Reject malformed transport encoding before dynamic route matching can throw.
export function proxy(request: NextRequest) {
  try {
    decodeURIComponent(request.nextUrl.pathname);
  } catch {
    return new NextResponse("Malformed URL encoding", { status: 400 });
  }
  return NextResponse.next();
}

export const config = { matcher: "/rehber/:path*" };
