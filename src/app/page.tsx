"use client";

import { useEffect, useState } from "react";

export default function Home() {
    const [weatherData, setWeatherData] = useState();

    useEffect(() => {
        const fetchweather = async () => {
            const data = await fetch(
                `api/weather?lat=19.075983&lon=72.877655`,
                {
                    method: "GET",
                }
            )
                .then((res: any) => {
                    return res.json();
                })
                .catch((err) => {
                    status: 500;
                    message: err.message;
                });

            setWeatherData(data);
        };
        fetchweather();
    }, []);

    console.log(weatherData);

    return <h1>Hello World!</h1>;
}
