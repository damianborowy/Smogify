import React from "react";
import styles from "./style.module.scss";
import {
    aqiColors,
    temperatureColors,
    pm25Groups,
    pm10Groups,
    temperatureGroups,
    SensorReading,
} from "../../../models/Luftdaten";
import { Typography, useTheme } from "@material-ui/core";
import clsx from "clsx";

interface PointerProps {
    index: number;
    dataType: string;
    currentValue?: number;
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
}

const ColorsMeter = ({ dataType, bgColor, reading }: ColorsMeterProps) => {
    const theme = useTheme();

    const dataTypeColors =
        dataType === "Temperature" ? temperatureColors : aqiColors;

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
                />
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
        if (!reading) return true;


        switch (dataType) {
            case "PM2.5":
                return typeof reading.aqi25 === "number";
            case "PM10":
                return typeof reading.aqi10 === "number";
            case "Temperature":
                return typeof reading.temperatureGroup === "number";
            default:
                return false;
        }
    };

    return (
        <>
            {isDataPresent() ? (
                <div className={styles.colorMeter} style={getBackgroundColor()}>
                    <div className={styles.colors}>
                        {mapColorsToComponents()}
                    </div>
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
            ) : (
                <div className={styles.noData}>
                    <Typography>NO DATA</Typography>
                </div>
            )}
        </>
    );
};

export default ColorsMeter;
