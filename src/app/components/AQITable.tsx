import {
    Chip,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Skeleton,
} from "@nextui-org/react";
import { useEffect, useMemo, useState, useCallback } from "react";

type Props = {
    aqiTableData: { [key: string]: number } | undefined;
    aqiDataIsLoaded: boolean;
};

const AQITable = ({ aqiTableData, aqiDataIsLoaded }: Props) => {
    const [qualityData, setQualityData] = useState<{
        [key: string]: { color: string; label: string };
    }>();

    const getQuality = useCallback((component: string, value: number) => {
        const colorMapping = [
            { label: "Good", color: "#91c700" },
            { label: "Fair", color: "#ffb800" },
            { label: "Moderate", color: "#ff8d00" },
            { label: "Poor", color: "#ff3c00" },
            { label: "Bad", color: "#9936d4" },
        ];
        const ranges: { [key: string]: [number, number][] } = {
            co: [
                [0, 4400],
                [4400, 9400],
                [9400, 12400],
                [12400, 15400],
                [15400, Infinity],
            ],
            no2: [
                [0, 40],
                [40, 70],
                [70, 150],
                [150, 200],
                [200, Infinity],
            ],
            o3: [
                [0, 60],
                [60, 100],
                [100, 140],
                [140, 180],
                [180, Infinity],
            ],
            so2: [
                [0, 20],
                [20, 80],
                [80, 250],
                [250, 350],
                [350, Infinity],
            ],
            pm2_5: [
                [0, 10],
                [10, 25],
                [25, 50],
                [50, 75],
                [75, Infinity],
            ],
            pm10: [
                [0, 20],
                [20, 50],
                [50, 100],
                [100, 200],
                [200, Infinity],
            ],
        };

        const range = ranges[component];
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
        if (aqiTableData) {
            const qualityDict: {
                [key: string]: { color: string; label: string };
            } = {};

            for (const key in aqiTableData) {
                const value = aqiTableData[key];
                const quality = getQuality(key, value);
                qualityDict[key] = quality;
            }
            setQualityData(qualityDict);
        }
    }, [aqiTableData, getQuality]);

    return (
        <Table
            isHeaderSticky
            isCompact
            removeWrapper
            aria-label="Components concentration table"
        >
            <TableHeader>
                <TableColumn>Contents</TableColumn>
                <TableColumn className="flex flex-col justify-center items-start">
                    Concentration<span>(&mu;g/m&sup3;)</span>
                </TableColumn>
                <TableColumn>Quality</TableColumn>
            </TableHeader>
            {aqiDataIsLoaded && aqiTableData ? (
                <TableBody className="scroll-smooth">
                    <TableRow key={1}>
                        <TableCell className="font-bold">CO</TableCell>
                        <TableCell className="font-bold">
                            {aqiTableData?.co}
                        </TableCell>
                        <TableCell>
                            {qualityData && (
                                <Chip
                                    size="sm"
                                    className="font-extrabold text-sm"
                                    style={{
                                        backgroundColor: qualityData?.co.color,
                                    }}
                                >
                                    {qualityData?.co.label}
                                </Chip>
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow key={2}>
                        <TableCell className="font-bold">
                            NO<sub className="font-bold">2</sub>
                        </TableCell>
                        <TableCell className="font-bold">
                            {aqiTableData?.no2}
                        </TableCell>
                        <TableCell>
                            {qualityData && (
                                <Chip
                                    size="sm"
                                    className="font-extrabold text-sm"
                                    style={{
                                        backgroundColor: qualityData?.no2.color,
                                    }}
                                >
                                    {qualityData?.no2.label}
                                </Chip>
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow key={3}>
                        <TableCell className="font-bold">
                            O<sub className="font-bold">3</sub>
                        </TableCell>
                        <TableCell className="font-bold">
                            {aqiTableData?.o3}
                        </TableCell>
                        <TableCell>
                            {qualityData && (
                                <Chip
                                    size="sm"
                                    className="font-extrabold text-sm"
                                    style={{
                                        backgroundColor: qualityData?.o3.color,
                                    }}
                                >
                                    {qualityData?.o3.label}
                                </Chip>
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow key={4}>
                        <TableCell className="font-bold">
                            SO<sub className="font-bold">2</sub>
                        </TableCell>
                        <TableCell className="font-bold">
                            {aqiTableData?.so2}
                        </TableCell>
                        <TableCell>
                            {qualityData && (
                                <Chip
                                    size="sm"
                                    className="font-extrabold text-sm"
                                    style={{
                                        backgroundColor: qualityData?.so2.color,
                                    }}
                                >
                                    {qualityData?.so2.label}
                                </Chip>
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow key={5}>
                        <TableCell className="font-bold">
                            PM<sub className="font-bold">2.5</sub>
                        </TableCell>
                        <TableCell className="font-bold">
                            {aqiTableData?.pm2_5}
                        </TableCell>
                        <TableCell>
                            {qualityData && (
                                <Chip
                                    size="sm"
                                    className="font-extrabold text-sm"
                                    style={{
                                        backgroundColor:
                                            qualityData?.pm2_5.color,
                                    }}
                                >
                                    {qualityData?.pm2_5.label}
                                </Chip>
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow key={6}>
                        <TableCell className="font-bold">
                            PM<sub className="font-bold">10</sub>
                        </TableCell>
                        <TableCell className="font-bold">
                            {aqiTableData?.pm10}
                        </TableCell>
                        <TableCell>
                            {qualityData && (
                                <Chip
                                    size="sm"
                                    className="font-extrabold text-sm"
                                    style={{
                                        backgroundColor:
                                            qualityData?.pm10.color,
                                    }}
                                >
                                    {qualityData?.pm10.label}
                                </Chip>
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            ) : (
                <TableBody emptyContent="No rows to display.">{[]}</TableBody>
            )}
        </Table>
    );
};

export default AQITable;
