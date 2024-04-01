"use client";

import { useContext, useEffect, useState } from "react";
import { Spinner, Textarea } from "@nextui-org/react";
import { GeolocationContext } from "./context/GeeolocationContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainWeather from "./components/MainWeather";
import Metadata from "./components/Metadata";

export default function Home() {
    const [cords, setCords] = useState<{ lat: number; lon: number } | null>(
        null
    );
    const [weatherData, setWeatherData] = useState<WeatherData>();
    const [weatherDataIsLoaded, setWeatherDataIsLoaded] =
        useState<boolean>(true);

    const { navigatorIsAllowed } = useContext(GeolocationContext);

    const handleCords = (value: { lat: number; lon: number } | null) => {
        setCords(value);
    };

    useEffect(() => {
        setWeatherDataIsLoaded(false);
        const fetchweather = async () => {
            const data = await fetch(
                `api/weather?lat=${cords?.lat}&lon=${cords?.lon}`
            )
                .then((res: any) => {
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        return {
                            status: res.status,
                            message: res.message,
                        };
                    }
                })
                .catch((err) => {
                    status: 500;
                    message: err.message;
                });

            setWeatherData(data);
            setWeatherDataIsLoaded(true);
        };

        if (cords?.lat && cords?.lon) {
            fetchweather();
        }
    }, [cords]);

    useEffect(() => {
        if (navigatorIsAllowed) {
            setWeatherDataIsLoaded(false);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCords({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                    console.log("wassup...");
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }, [navigatorIsAllowed]);

    if (cords) {
        return (
            <div className="w-screen md:h-screen h-fit grid md:grid-cols-4 md:grid-rows-11 grid-cols-1 grid-rows-[repeat(25,_minmax(0,_1fr))] scroll-smooth">
                <Header handleCords={handleCords} />
                <MainWeather
                    data={weatherData ?? null}
                    isLoaded={weatherDataIsLoaded}
                />
                <div className="md:col-span-3 col-span-1 md:row-span-9 row-[span_15_/_span_15] md:col-start-2 col-start-1 md:row-start-2 row-start-10 grid md:grid-cols-3 grid-cols-1 md:grid-rows-9 grid-rows-[repeat(21,_minmax(0,_1fr))] px-2 md:my-0 my-2 md:gap-3 gap-4">
                    <Metadata
                        data={weatherData ?? null}
                        isLoaded={weatherDataIsLoaded}
                        cords={cords}
                    />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div
            className={`w-screen md:h-screen${
                !cords && " h-screen"
            } grid md:grid-cols-4 md:grid-rows-11 grid-cols-1 grid-rows-[repeat(26, minmax(0, 1fr))]`}
        >
            <Header handleCords={handleCords} />
            {!navigatorIsAllowed && !cords ? (
                <div className="h-auto md:col-span-4 col-span-1 md:row-span-9 row-[span_23_/_span_23] col-start-1 row-start-2 flex justify-center items-center">
                    <Textarea
                        isReadOnly
                        label="Note:"
                        variant="bordered"
                        labelPlacement="inside"
                        defaultValue="To get accurate weather updates please grant location access and reload the page or search any city."
                        className="max-w-xs"
                    />
                </div>
            ) : (
                <div className="h-auto md:col-span-4 col-span-1 md:row-span-9 row-[span_23_/_span_23] col-start-1 row-start-2 flex justify-center items-center">
                    <Spinner />
                </div>
            )}
            <Footer />
        </div>
    );
}
