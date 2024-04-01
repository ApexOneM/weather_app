import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    let resStatus: number = 200;
    let error: boolean = false;

    const query = req.nextUrl.searchParams.get("query") as string;
    const API_KEY = process.env.WEATHER_API_KEY as string;
    const API_URL = process.env.WEATHER_API_URL as string;

    const apiResponse = await fetch(
        `${API_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
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
