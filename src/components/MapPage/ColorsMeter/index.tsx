import React from "react";
import styles from "./style.module.scss";
import { aqiColors, temperatureColors } from "../../../models/Luftdaten";

interface PointerProps {
    value: number;
}

const Pointer = ({ value }: PointerProps) => {};

interface ColorsMeterProps {
    dataType: string;
}

const ColorsMeter = ({ dataType }: ColorsMeterProps) => {
    const dataTypeColors =
        dataType === "Temperature" ? temperatureColors : aqiColors;

    return (
        <div className={styles.colorMeter}>
            {dataTypeColors.map((color) => (
                <div
                    className={styles.color}
                    style={{
                        backgroundColor: color,
                        width: `calc(100% / ${dataTypeColors.length})`,
                    }}
                ></div>
            ))}
        </div>
    );
};

export default ColorsMeter;
