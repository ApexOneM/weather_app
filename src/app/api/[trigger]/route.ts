import { NextRequest, NextResponse } from "next/server";

type Params = {
    trigger: "weather" | "forecast" | "air_pollution";
};

export async function GET(req: NextRequest, context: { params: Params }) {
    const trigger = context.params.trigger;

    let resStatus: number = 200;
    let error: boolean = false;

    const lat = req.nextUrl.searchParams.get("lat") as string;
    const lon = req.nextUrl.searchParams.get("lon") as string;
    const API_KEY = process.env.WEATHER_API_KEY as string;
    const API_URL = process.env.WEATHER_API_URL as string;

    const apiResponse = await fetch(
        `${API_URL}/data/2.5/${trigger}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
        { next: { revalidate: 3600 } }
    )
        .then((res) => {
            resStatus = res.status;
            return res.json();
        })
        .catch((err) => {
            error = true;
            console.log(err);
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
