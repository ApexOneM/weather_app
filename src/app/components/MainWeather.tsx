import { Skeleton, Spacer, Divider } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { useState, useEffect } from "react";

type DateTime = {
    time: string;
    prefix: string;
    date: string;
    day: string;
};

const MainWeather = (props: {
    data: WeatherData | null;
    isLoaded: boolean;
}) => {
    const [dateTime, setDateTime] = useState<DateTime>(getDateTime());

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(getDateTime());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    function getDateTime(): DateTime {
        function pad(n: number) {
            return n < 10 ? "0" + n : n;
        }

        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const dayNames = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        const dateTime = new Date();

        const timeString = dateTime.toLocaleTimeString().split(" ");
        const time = timeString[0];
        const prefix = timeString[1];

        const dateNum = dateTime.getDate();
        const monthIndex = dateTime.getMonth();
        const year = dateTime.getFullYear();
        const dayIndex = dateTime.getDay();

        const date = pad(dateNum) + " " + monthNames[monthIndex] + ", " + year;

        const day = dayNames[dayIndex];

        return { time, prefix, date, day };
    }

    return (
        <main className="col-span-1 md:row-span-9 row-span-7 row-start-2 col-start-1 flex flex-col justify-evenly items-center md:gap-0 gap-2">
            <div className="w-full flex flex-col justify-center items-center">
                <Skeleton
                    isLoaded={props.isLoaded}
                    className="rounded-lg w-[7rem] h-[7rem] flex justify-center items-center"
                >
                    <Image
                        loading="lazy"
                        width={300}
                        alt="icon"
                        src={`https://raw.githubusercontent.com/basmilius/weather-icons/6c186523be593ebe2e5674705b904a6d96c96a0c/production/fill/openweathermap/${props.data?.weather[0].icon}.svg`}
                    />
                </Skeleton>
                <Spacer x={1} />
                <Skeleton
                    isLoaded={props.isLoaded}
                    className="rounded-lg w-1/2 h-8 flex justify-center items-center"
                >
                    <div className="text-2xl font-normal">
                        {props.data?.weather[0].main}
                    </div>
                </Skeleton>
                <Spacer x={1} />
                <Skeleton
                    isLoaded={props.isLoaded}
                    className={`rounded-lg ${
                        props.isLoaded ? "w-fit" : "w-2/5"
                    } h-7 flex justify-center items-center`}
                >
                    <div className="text-gray-800 text-lg font-bold italic text-nowrap">
                        {props.data?.weather[0].description}
                    </div>
                </Skeleton>
                <Spacer x={1} />
                <Skeleton
                    isLoaded={props.isLoaded}
                    className="rounded-lg flex justify-center items-center h-[3.75rem] w-2/3"
                >
                    <div className="flex justify-center items-start text-6xl font-light">
                        {props.data?.main.temp}
                        <span className="text-base font-bold italic">°C</span>
                    </div>
                </Skeleton>
            </div>
            <Divider className="w-4/5" />
            <div className="flex flex-col justify-center items-center w-full">
                <div className="text-sm font-semibold">{dateTime.day}</div>
                <Spacer x={1} />
                <div className="text-lg font-medium">{dateTime.date}</div>
                <Spacer x={1} />
                <div className="flex justify-center items-center dark:bg-blue-500 bg-zinc-500 p-2 rounded-lg">
                    <div className="flex justify-center items-center w-20 font-bold">
                        {dateTime.time}
                    </div>
                    <span className="font-semibold">{dateTime.prefix}</span>
                </div>
            </div>
            <Skeleton
                isLoaded={props.isLoaded}
                className="rounded-lg h-8 w-8/12 flex justify-center items-center"
            >
                <p className="font-normal text-inherit text-2xl">
                    {props.data?.name}
                </p>
            </Skeleton>
        </main>
    );
};

export default MainWeather;
