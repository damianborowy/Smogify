import { Paper } from "@material-ui/core";
import React from "react";
import { OpenWeatherMapData } from "../../../models/OpenWeatherMap";
import styles from "./style.module.scss";

interface WeatherInfoProps {
    weather: OpenWeatherMapData | null;
    // pollution: SensorReading;
}

const WeatherInfo = ({ weather }: WeatherInfoProps) => {
    return (
        <div>
            <Paper className={styles.container}>
                {/* {pollution.aqi25} */}
                {weather && weather.city}
                {weather && weather.location.lat}
                {weather &&
                    weather.weatherReadings.map((reading) => reading.temp)}
            </Paper>
        </div>
    );
};

export default WeatherInfo;
