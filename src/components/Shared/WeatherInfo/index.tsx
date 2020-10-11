import { Paper } from "@material-ui/core";
import React from "react";
import { OpenWeatherMapData } from "../../../models/OpenWeatherMap";
import styles from "./style.module.scss";

interface WeatherInfoProps {
    weather: OpenWeatherMapData | null;
}

const WeatherInfo = ({ weather }: WeatherInfoProps) => {
    return (
        <div>
            <Paper className={styles.container}>
                <p>{weather && weather.location.lat}</p>
                <p>Foo</p>
            </Paper>
        </div>
    );
};

export default WeatherInfo;
