import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    let resStatus: number = 200;
    let error: boolean = false;

    const lat = req.nextUrl.searchParams.get("lat") as string;
    const lon = req.nextUrl.searchParams.get("lon") as string;
    const API_KEY = process.env.OPENUVI_API_KEY as string;
    const API_URL = process.env.OPENUVI_API_URL as string;

    const apiResponse = await fetch(
        `${API_URL}/uv?lat=${lat}&lng=${lon}&alt=100`,
        { headers: { "x-access-token": API_KEY } }
    )
        .then((res) => {
            resStatus = res.status;
            return res.json();
        })
        .catch((err) => {
            console.log(err);
            error = true;
        });

    if (error) {
        return NextResponse.json(
            { message: "Exception occurred!" },
            { status: 500 }
        );
    } else if (resStatus === 200) {
        return NextResponse.json(apiResponse, { status: 200 });
    } else {
        return NextResponse.json(
            { message: apiResponse.message.split(".")[0] },
            { status: resStatus }
        );
    }
}
