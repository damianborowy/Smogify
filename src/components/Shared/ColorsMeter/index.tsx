import React from "react";
import styles from "./style.module.scss";
import {
    aqiColors,
    temperatureColors,
    pm25Groups,
    pm10Groups,
    temperatureGroups,
    SensorReading,
} from "../../../models/Pollution";
import { CircularProgress, Typography, useTheme } from "@material-ui/core";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface CurrentValuePointerProps {
    value: number;
    group: number[];
}

const CurrentValuePointer = ({ value, group }: CurrentValuePointerProps) => {
    const theme = useTheme();

    const calculateLeft = () => {
        if (group[1] === Number.MAX_SAFE_INTEGER) return "50%";

        return `${((value - group[0]) / (group[1] - group[0])) * 100}%`;
    };

    return (
        <div
            className={styles.currentValuePointer}
            style={{
                left: calculateLeft(),
                backgroundColor:
                    theme.palette.type === "dark" ? "#eee" : "#111",
            }}
        >
            <Typography
                className={styles.currentValue}
                style={{
                    color:
                        theme.palette.type === "dark" ? "lightgray" : "black",
                }}
            >
                {value}
            </Typography>
        </div>
    );
};

interface PointerProps {
    index: number;
    dataType: string;
}

const Pointer = ({ index, dataType }: PointerProps) => {
    const theme = useTheme();

    const getValue = () => {
        if (dataType === "AQI") return index;
        else if (dataType === "Temperature") {
            if (index === 0) return "Min";
            if (index === temperatureGroups.length) return "Max";
            else return temperatureGroups[index].minValue;
        } else {
            const collection = dataType === "PM2.5" ? pm25Groups : pm10Groups;

            if (index > collection.length - 1) return "Max";
            else return collection[index][0];
        }
    };

    return (
        <div
            className={styles.pointer}
            style={{
                backgroundColor:
                    theme.palette.type === "dark" ? "#eee" : "#111",
            }}
        >
            <Typography
                className={clsx(styles.value, {
                    [styles.valueAQI]: dataType === "AQI",
                })}
                style={{
                    color:
                        theme.palette.type === "dark" ? "lightgray" : "black",
                }}
            >
                {getValue()}
            </Typography>
        </div>
    );
};

interface ColorsMeterProps {
    dataType: string;
    bgColor: "default" | "none";
    reading?: SensorReading;
    showType?: boolean;
    noData?: boolean;
}

const ColorsMeter = ({
    dataType,
    bgColor,
    reading,
    showType,
    noData,
}: ColorsMeterProps) => {
    const theme = useTheme(),
        pollution = useSelector((state: RootState) => state.pollution),
        dataTypeColors =
            dataType === "Temperature" ? temperatureColors : aqiColors;

    const getCurrentValue = () =>
        reading && (dataType === "PM2.5" ? reading.pm25 : reading.pm10);

    const getGroup = () => {
        const groups = dataType === "PM2.5" ? pm25Groups : pm10Groups,
            currentValue = getCurrentValue();

        let groupIndex = 0,
            group = groups[0];

        for (let i = 0; i < groups.length; i++)
            if (groups[i][0] < currentValue! && currentValue! < groups[i][1]) {
                groupIndex = i;
                group = groups[i];
                break;
            }

        return {
            groupIndex,
            group,
        };
    };

    const mapColorsToComponents = () => {
        const colorDivs = dataTypeColors.map((color, i) => (
            <React.Fragment key={i}>
                <Pointer index={i} dataType={dataType} />
                <div
                    className={styles.color}
                    style={{
                        backgroundColor: color,
                        width: `calc(100% / ${dataTypeColors.length})`,
                    }}
                >
                    {getCurrentValue() && getGroup().groupIndex === i && (
                        <CurrentValuePointer
                            value={getCurrentValue()!}
                            group={getGroup().group}
                        />
                    )}
                </div>
            </React.Fragment>
        ));

        colorDivs.push(
            <Pointer
                key={dataTypeColors.length}
                index={dataTypeColors.length}
                dataType={dataType}
            />
        );

        return colorDivs;
    };

    const getUnit = () => {
        switch (dataType) {
            case "Temperature":
                return "°C";
            case "AQI":
                return "AQI";
            default:
                return "μg/m³";
        }
    };

    const getBackgroundColor = () => {
        const color =
            theme.palette.type === "dark"
                ? "rgba(80, 80, 80, 0.6)"
                : "rgba(170, 170, 170, 0.6)";

        return {
            backgroundColor: bgColor === "default" ? color : "unset",
        };
    };

    const isDataPresent = () => {
        if (!reading) return false;

        switch (dataType) {
            case "PM2.5":
                return typeof reading.aqi25 === "number";
            case "PM10":
                return typeof reading.aqi10 === "number";
            default:
                return false;
        }
    };

    return (
        <>
            <div
                className={clsx(styles.colorMeter, {
                    [styles.meterWithoutType]: !showType,
                    [styles.meterWithType]: showType,
                })}
                style={getBackgroundColor()}
            >
                {showType && (
                    <Typography className={styles.readingText}>
                        {dataType === "PM2.5" ? "PM 2.5" : "PM 10"}
                    </Typography>
                )}
                {!noData && pollution.isFetching ? (
                    <div className={styles.fetchingData}>
                        <CircularProgress
                            className={styles.progress}
                            size={16}
                        />
                        <Typography>Fetching data...</Typography>
                    </div>
                ) : (
                    <div className={styles.colors}>
                        {!isDataPresent() && !noData && (
                            <Typography className={styles.noData}>
                                No data
                            </Typography>
                        )}
                        <div className={styles.colorBar}>
                            {mapColorsToComponents()}
                        </div>
                    </div>
                )}
                <Typography
                    className={styles.unit}
                    style={{
                        color:
                            theme.palette.type === "dark"
                                ? "lightgray"
                                : "black",
                    }}
                >
                    {getUnit()}
                </Typography>
            </div>
        </>
    );
};

export default ColorsMeter;
