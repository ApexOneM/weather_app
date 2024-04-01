import { Card, CardHeader, CardBody, Skeleton } from "@nextui-org/react";
import { useState, useEffect } from "react";

type Props = {
    cords: { lat: number; lon: number } | null;
};

const Forecast = (props: Props) => {
    const [forecastData, setForecastData] = useState<ForecastData>();
    const [forecastDataIsLoaded, setForecastDataIsLoaded] =
        useState<boolean>(true);

    useEffect(() => {
        setForecastDataIsLoaded(false);
        const cords = props.cords;

        const fetchForecast = async () => {
            const data = await fetch(
                `api/forecast?lat=${cords?.lat}&lon=${cords?.lon}`
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

            setForecastData(data);
            setForecastDataIsLoaded(true);
        };

        if (cords?.lat && cords?.lon) {
            fetchForecast();
        }
    }, [props.cords]);

    return (
        <Card
            shadow="none"
            className="md:col-span-3 md:row-span-3 col-start-1 md:row-start-7 row-start-19 dark:bg-[#18181b] bg-[#f4f4f5]"
        >
            <CardHeader>Forecast:</CardHeader>
            <Skeleton isLoaded={forecastDataIsLoaded} className="h-full w-full">
                <CardBody className="h-full w-full flex justify-center items-center italic">
                    Comming soon...
                </CardBody>
            </Skeleton>
        </Card>
    );
};

export default Forecast;
