import { Skeleton, Image, Chip } from "@nextui-org/react";
import UVGauge from "../assets/UVGauge";
import { useCallback, useEffect, useState } from "react";
import PressureGauge from "../assets/PressureGauge";
import HumidityGauge from "../assets/HumidityGauge";
import Compass from "../assets/Compass";

type Props = {
    data: WeatherData | null;
    isLoaded: boolean;
    cords: { lat: number; lon: number } | null;
};

type TimeInfo = {
    time: string;
    unit: "AM" | "PM";
};

const Metadata = ({ data, isLoaded, cords }: Props) => {
    const [sunrise, setSunrise] = useState<TimeInfo | null>(null);
    const [sunset, setSunset] = useState<TimeInfo | null>(null);
    const [uvData, setUVData] = useState<UVData | null>(null);
    const [qualityData, setQualityData] = useState<{
        color: string;
        label: string;
    }>();
    const [uvDataIsLoaded, setUVDataIsLoaded] = useState<boolean>(true);

    function timestampToReadable(timestamp: number): TimeInfo {
        // Convert timestamp to milliseconds
        let milliseconds: number = timestamp * 1000;

        // Create a new Date object
        let dateObject: Date = new Date(milliseconds);

        // Get the hour and minutes
        let hours: number = dateObject.getHours();
        let minutes: number = dateObject.getMinutes();

        // Convert hours to 12-hour format and determine AM/PM
        let unit: "AM" | "PM" = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours)

        // Add leading zeros to minutes if necessary
        let minutesString: string = ("0" + minutes).slice(-2);

        // Construct the readable time string
        let time: string = hours + ":" + minutesString;

        return { time, unit };
    }

    const getUVQuality = useCallback((value: number) => {
        const colorMapping = [
            { label: "Good", color: "#91c700" },
            { label: "Fair", color: "#ffb800" },
            { label: "Medium", color: "#ff8d00" },
            { label: "Poor", color: "#ff3c00" },
            { label: "Bad", color: "#9936d4" },
        ];

        const range = [
            [0, 3],
            [3, 6],
            [6, 8],
            [8, 10],
            [10, 11],
        ];

        const chip = range?.findIndex(
            ([min, max]) => value >= min && value < max
        );

        const quality = chip === -1 ? range.length - 1 : chip;

        return {
            color: colorMapping[quality]?.color,
            label: colorMapping[quality]?.label,
        };
    }, []);

    useEffect(() => {
        if (data) {
            const sunrise = timestampToReadable(data.sys.sunrise);
            const sunset = timestampToReadable(data.sys.sunset);
            setSunrise(sunrise);
            setSunset(sunset);
        }
    }, [data]);

    useEffect(() => {
        setUVDataIsLoaded(false);
        const fetchUVData = async () => {
            const data: UVData = await fetch(
                `api/uvi?lat=${cords?.lat}&lon=${cords?.lon}`
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

            setUVData(data);
            setQualityData(getUVQuality(data.result.uv));
            setUVDataIsLoaded(true);
        };

        if (cords?.lat && cords?.lon) {
            fetchUVData();
        }
    }, [cords, getUVQuality]);

    return (
        <div className="md:col-span-2 md:row-span-6 md:col-start-1 row-start-1 col-span-1 row-span-12 grid md:grid-cols-2 grid-cols-1 md:grid-rows-6 grid-rows-12 md:gap-2 gap-4">
            <div className="w-full h-full col-span-1 row-span-6 col-start-1 row-start-1 rounded-xl grid grid-cols-1 grid-rows-4 gap-1">
                <div className="w-full col-span-1 row-span-1 row-start-1 rounded-xl flex justify-between items-center">
                    <div className="flex justify-center items-center">
                        <Image
                            loading="lazy"
                            src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/thermometer.svg"
                            alt=""
                            width={60}
                        />
                        <div className="flex flex-col justify-center items-start">
                            <div className="text-sm font-normal">
                                feels like
                            </div>
                            <Skeleton
                                isLoaded={isLoaded}
                                className="rounded-lg flex justify-start items-center w-24 h-7"
                            >
                                <div className="flex justify-center items-start gap-1 text-xl font-normal">
                                    {data?.main.feels_like}
                                    <span className="text-base font-bold italic">
                                        °C
                                    </span>
                                </div>
                            </Skeleton>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Image
                            loading="lazy"
                            src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/dust-day.svg"
                            alt=""
                            width={60}
                        />
                        <div className="flex flex-col justify-center items-start">
                            <div className="text-sm font-normal">
                                visibility
                            </div>
                            <Skeleton
                                isLoaded={isLoaded}
                                className="rounded-lg flex justify-start items-center w-24 h-7"
                            >
                                <div className="flex justify-center items-baseline gap-1 text-xl font-normal">
                                    {data?.visibility}
                                    <span className="text-base font-bold italic">
                                        m
                                    </span>
                                </div>
                            </Skeleton>
                        </div>
                    </div>
                </div>
                <div className="w-full col-span-1 row-span-1 row-start-2 rounded-xl flex justify-between items-center">
                    <div className="flex justify-center items-center">
                        <Image
                            loading="lazy"
                            src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/thermometer-warmer.svg"
                            alt=""
                            width={60}
                        />
                        <div className="flex flex-col justify-center items-start">
                            <div className="text-sm font-normal">max temp</div>
                            <Skeleton
                                isLoaded={isLoaded}
                                className="rounded-lg flex justify-start items-center w-24 h-7"
                            >
                                <div className="flex justify-center items-start gap-1 text-xl font-normal">
                                    {data?.main.temp_max}
                                    <span className="text-base font-bold italic">
                                        °C
                                    </span>
                                </div>
                            </Skeleton>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Image
                            loading="lazy"
                            src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/thermometer-colder.svg"
                            alt=""
                            width={60}
                        />
                        <div className="flex flex-col justify-center items-start">
                            <div className="text-sm font-normal">min temp</div>
                            <Skeleton
                                isLoaded={isLoaded}
                                className="rounded-lg flex justify-start items-center w-24 h-7"
                            >
                                <div className="flex justify-center items-start gap-1 text-xl font-normal">
                                    {data?.main.temp_min}
                                    <span className="text-base font-bold italic">
                                        °C
                                    </span>
                                </div>
                            </Skeleton>
                        </div>
                    </div>
                </div>
                <div className="w-full col-span-1 row-span-1 row-start-3 rounded-xl flex justify-between items-center">
                    <div className="flex justify-center items-center">
                        <Image
                            loading="lazy"
                            src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/sunrise.svg"
                            alt=""
                            width={60}
                        />
                        <div className="flex flex-col justify-center items-start">
                            <div className="text-sm font-normal">sunrise</div>
                            <Skeleton
                                isLoaded={isLoaded}
                                className="rounded-lg flex justify-start items-center w-24 h-7"
                            >
                                <div className="flex justify-center items-baseline gap-1 text-xl font-normal">
                                    {sunrise?.time}
                                    <span className="text-base font-bold italic">
                                        {sunrise?.unit}
                                    </span>
                                </div>
                            </Skeleton>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Image
                            loading="lazy"
                            src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/sunset.svg"
                            alt=""
                            width={60}
                        />
                        <div className="flex flex-col justify-center items-start">
                            <div className="text-sm font-normal">sunset</div>
                            <Skeleton
                                isLoaded={isLoaded}
                                className="rounded-lg flex justify-start items-center w-24 h-7"
                            >
                                <div className="flex justify-center items-baseline gap-1 text-xl font-normal">
                                    {sunset?.time}
                                    <span className="text-base font-bold italic">
                                        {sunset?.unit}
                                    </span>
                                </div>
                            </Skeleton>
                        </div>
                    </div>
                </div>
                <div className="w-full col-span-1 row-span-1 row-start-4 rounded-xl flex justify-between items-center">
                    <div className="flex justify-center items-center">
                        <Image
                            loading="lazy"
                            src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/windsock.svg"
                            alt=""
                            width={60}
                        />
                        <div className="flex flex-col justify-center items-start">
                            <div className="text-sm font-normal">
                                wind speed
                            </div>
                            <Skeleton
                                isLoaded={isLoaded}
                                className="rounded-lg flex justify-start items-center w-24 h-7"
                            >
                                <div className="flex justify-center items-baseline gap-1 text-xl font-normal">
                                    {data?.wind.speed}
                                    <span className="text-base font-bold italic">
                                        m/s
                                    </span>
                                </div>
                            </Skeleton>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Compass
                            deg={data?.wind.deg ? data?.wind.deg : 0}
                            size={60}
                        />
                        <div className="flex flex-col justify-center items-start">
                            <div className="text-sm font-normal">wind deg</div>
                            <Skeleton
                                isLoaded={isLoaded}
                                className="rounded-lg flex justify-start items-center w-24 h-7"
                            >
                                <div className="flex justify-center items-start gap-1 text-xl font-normal">
                                    {data?.wind.deg}
                                    <span className="text-base font-bold italic">
                                        °
                                    </span>
                                </div>
                            </Skeleton>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-1 row-span-2 md:col-start-2 col-start-1 md:row-start-1 row-start-7 rounded-xl flex justify-between items-center p-2 dark:bg-[#18181b] bg-[#f4f4f5] pb-4">
                <div className="flex flex-col justify-between items-start h-full">
                    <div>Pressure:</div>
                    <div className="flex justify-start items-baseline">
                        <Skeleton
                            isLoaded={isLoaded}
                            className="rounded-lg flex justify-center items-center w-32 h-9"
                        >
                            <div className="flex justify-start items-baseline gap-1 text-3xl font-normal">
                                {data?.main.pressure}
                                <span className="text-base font-semibold">
                                    hPa
                                </span>
                            </div>
                        </Skeleton>
                    </div>
                </div>
                {data && data.main.pressure > 1013.25 ? (
                    <Image
                        loading="lazy"
                        src={`https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/pressure-high.svg`}
                        alt="1013.25"
                        width={60}
                    />
                ) : (
                    <Image
                        loading="lazy"
                        src={`https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/pressure-low.svg`}
                        alt="1013.25"
                        width={60}
                    />
                )}
                <PressureGauge
                    min={900}
                    max={1200}
                    value={
                        data?.main.pressure
                            ? (data?.main.pressure as number)
                            : 900
                    }
                />
            </div>

            <div className="col-span-1 row-span-2 md:col-start-2 col-start-1 md:row-start-3 row-start-9 rounded-xl flex justify-between items-center p-2 dark:bg-[#18181b] bg-[#f4f4f5] pb-4">
                <div className="flex flex-col justify-between items-start h-full">
                    <div>UV Index:</div>
                    <div className="flex justify-start items-center">
                        <Skeleton
                            isLoaded={uvDataIsLoaded}
                            className="rounded-lg flex justify-center items-center w-32 h-9"
                        >
                            <div className="flex justify-start items-baseline gap-1 text-3xl font-normal">
                                {uvData?.result.uv ? uvData.result.uv : 0}
                            </div>
                        </Skeleton>
                    </div>
                </div>
                {qualityData && (
                    <Chip
                        size="sm"
                        className="font-extrabold text-sm"
                        style={{
                            backgroundColor: qualityData?.color,
                        }}
                    >
                        {qualityData?.label}
                    </Chip>
                )}
                <UVGauge
                    min={0}
                    max={11}
                    value={
                        uvDataIsLoaded && uvData?.result.uv
                            ? (uvData?.result.uv as number)
                            : 0
                    }
                />
            </div>

            <div className="col-span-1 row-span-2 md:col-start-2 col-start-1 md:row-start-5 row-start-11 rounded-xl flex justify-between items-center p-2 dark:bg-[#18181b] bg-[#f4f4f5] pb-4">
                <div className="flex flex-col justify-between items-start h-full">
                    <div>Humidity:</div>
                    <div className="flex justify-start items-baseline">
                        <Skeleton
                            isLoaded={isLoaded}
                            className="rounded-lg flex justify-center items-center w-32 h-9"
                        >
                            <div className="flex justify-start items-baseline gap-1 text-3xl font-normal">
                                {data?.main.humidity}
                                <span className="text-base font-semibold">
                                    %
                                </span>
                            </div>
                        </Skeleton>
                    </div>
                </div>
                <Image
                    loading="lazy"
                    src={`https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/humidity.svg`}
                    alt="1013.25"
                    width={60}
                />
                <HumidityGauge
                    min={0}
                    max={100}
                    value={
                        data?.main.humidity
                            ? (data?.main.humidity as number)
                            : 0
                    }
                />
            </div>
        </div>
    );
};

export default Metadata;
