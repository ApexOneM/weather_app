import React from "react";
import { arc } from "d3-shape";
import { scaleLinear } from "d3-scale";

type Props = {
    value: number;
    min: number;
    max: number;
};

const HumidityGauge = ({ value, min, max }: Props) => {
    const backgroundArc = arc().cornerRadius(1)({
        innerRadius: 0.65,
        outerRadius: 1,
        startAngle: -Math.PI / 2,
        endAngle: Math.PI / 2,
    }) as string;

    const percentScale = scaleLinear().domain([min, max]).range([0, 1]);

    const percent = percentScale(value);

    const angleScale = scaleLinear()
        .domain([0, 1])
        .range([-Math.PI / 2, Math.PI / 2])
        .clamp(true);

    const angle = angleScale(percent);

    const filledArc = arc().cornerRadius(1)({
        innerRadius: 0.65,
        outerRadius: 1,
        startAngle: -Math.PI / 2,
        endAngle: angle,
    }) as string;

    return (
        <div
            style={{
                textAlign: "center",
            }}
        >
            <svg
                style={{ overflow: "visible" }}
                width="7em"
                viewBox={[-1, -1, 2, 1].join(" ")}
            >
                <path d={backgroundArc} fill="#dbdbe7" />
                <path d={filledArc} fill="#3b82f6" />
                {/* <circle
                    cx={markerLocation[0]}
                    cy={markerLocation[1]}
                    r="0.2"
                    stroke="white"
                    strokeWidth="0.03"
                    fill="#3b82f6"
                /> */}
                <path
                    d="M0.136364 0.0290102C0.158279 -0.0096701 0.219156 -0.00967009 0.241071 0.0290102C0.297078 0.120023 0.375 0.263367 0.375 0.324801C0.375 0.422639 0.292208 0.5 0.1875 0.5C0.0852272 0.5 -1.8346e-08 0.422639 -9.79274e-09 0.324801C0.00243506 0.263367 0.0803571 0.120023 0.136364 0.0290102ZM0.1875 0.381684C0.221591 0.381684 0.248377 0.356655 0.248377 0.324801C0.248377 0.292947 0.221591 0.267918 0.1875 0.267918C0.153409 0.267918 0.126623 0.292947 0.126623 0.324801C0.126623 0.356655 0.155844 0.381684 0.1875 0.381684Z"
                    transform={`rotate(${
                        angle * (180 / Math.PI)
                    }) translate(-0.2, -0.33)`}
                    fill="#3b82f6"
                />
            </svg>
        </div>
    );
};

const getCoordsOnArc = (angle: number, offset = 10) => [
    Math.cos(angle - Math.PI / 2) * offset,
    Math.sin(angle - Math.PI / 2) * offset,
];

export default HumidityGauge;
