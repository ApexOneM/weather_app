import {
    Card,
    CardHeader,
    CardBody,
    Skeleton,
    Divider,
    Chip,
    Spacer,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import AQITable from "./AQITable";
import { MdInfoOutline } from "react-icons/md";

type Props = {
    cords: { lat: number; lon: number } | null;
};

const AQI = (props: Props) => {
    const [AQI, setAQI] = useState<number>(0);
    const [AQIDataIsLoaded, setAQIDataIsLoaded] = useState<boolean>(true);
    const [tableData, setTableData] = useState<AQITableData>();

    const colorMapping = [
        "#91c700",
        "#ffb800",
        "#ff8d00",
        "#ff3c00",
        "#9936d4",
    ];

    useEffect(() => {
        setAQIDataIsLoaded(false);
        const cords = props.cords;

        const fetchForecast = async () => {
            const data: AirQualityData = await fetch(
                `api/air_pollution?lat=${cords?.lat}&lon=${cords?.lon}`
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

            setAQI(data.list[0].main.aqi);
            setTableData(data.list[0].components);
            setAQIDataIsLoaded(true);
        };

        if (cords?.lat && cords?.lon) {
            fetchForecast();
        }
    }, [props.cords]);

    return (
        <Card
            isBlurred
            shadow="none"
            className="border-[1px] dark:border-[#18181b] border-[#e9e9e9] col-span-1 row-span-6 md:col-start-3 md:row-start-1 row-start-13"
        >
            <CardHeader className="justify-between">
                <div className="flex justify-center items-baseline">
                    <div>AQI:</div>
                    <Spacer x={2} />
                    <Skeleton
                        isLoaded={AQIDataIsLoaded}
                        className="rounded-lg w-10 h-8 flex justify-center items-center"
                    >
                        <Chip
                            style={{
                                backgroundColor: `${colorMapping[AQI - 1]}`,
                            }}
                            size="lg"
                            radius="sm"
                        >
                            {AQI}
                        </Chip>
                    </Skeleton>
                </div>
                {/* <MdInfoOutline size={"1.2rem"} /> */}
                <Popover placement="right">
                    <PopoverTrigger>
                        <Button
                            isIconOnly
                            aria-label="info"
                            color="default"
                            radius="full"
                            size="sm"
                            variant="light"
                        >
                            <MdInfoOutline size={"1.2rem"} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="px-1 py-2">
                            <div className="text-small font-bold">Info</div>
                            <div className="text-tiny">Comming soon...</div>
                        </div>
                    </PopoverContent>
                </Popover>
            </CardHeader>
            <Divider />
            <CardBody>
                <AQITable
                    aqiTableData={tableData}
                    aqiDataIsLoaded={AQIDataIsLoaded}
                />
            </CardBody>
        </Card>
    );
};

export default AQI;
