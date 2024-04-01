import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
    matcher: "/api/:path*",
};

export async function middleware(req: NextRequest) {
    const INSTANCE = process.env.INSTANCE as string;

    if (INSTANCE === "PROD") {
        if (req.nextUrl.host !== "weather-app-nu-five-96.vercel.app") {
            return NextResponse.json(
                { message: "Forbidden access" },
                { status: 403 }
            );
        }
    }
    return NextResponse.next();
}
