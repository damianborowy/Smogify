import React from "react";
import { OpenWeatherMapData } from "../../../models/OpenWeatherMap";
import styles from "./style.module.scss";

interface WeatherInfoProps {
    weather: OpenWeatherMapData | null;
}

const WeatherInfo = ({ weather }: WeatherInfoProps) => {
    return (
        <div className={styles.container}>
            {weather ? (
                <>
                    <div className={styles.row}>
                        <div className={styles.temperature}>
                            {weather.weatherReadings[0].temp}{" "}
                            {weather.weatherReadings[0].feelsLike}
                        </div>
                        <div className={styles.item}>
                            {weather.weatherReadings[0].weather}
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.item}>
                            {weather.weatherReadings[0].humidity}
                        </div>
                        <div className={styles.item}>
                            {weather.weatherReadings[0].pressure}
                        </div>
                        <div className={styles.item}>
                            {weather.weatherReadings[0].windDeg}
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.item}>
                            {weather.weatherReadings[0].probOfPrecipation}
                        </div>
                        <div>FORECAST</div>
                    </div>
                </>
            ) : (
                "Fetching..."
            )}
        </div>
    );
};

export default WeatherInfo;
