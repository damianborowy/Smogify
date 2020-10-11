import { CircularProgress, Typography } from "@material-ui/core";
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
                        <div className={styles.item}>
                            <img
                                className={styles.temperatureIcon}
                                src={`${process.env.PUBLIC_URL}/icons/wi-celsius.svg`}
                                alt=""
                            />
                            <Typography>
                                {`${(
                                    weather.weatherReadings[0].temp - 273
                                ).toFixed(0)}°C`}
                            </Typography>
                        </div>
                        <div className={styles.item}>
                            <img
                                className={styles.icon}
                                src={`${process.env.PUBLIC_URL}/icons/${weather.weatherReadings[0].icon}.svg`}
                                alt=""
                            />
                            <Typography>
                                {weather.weatherReadings[0].weather}
                            </Typography>
                        </div>
                        <div className={styles.item}>
                            <img
                                className={styles.icon}
                                src={`${process.env.PUBLIC_URL}/icons/wi-humidity.svg`}
                                alt=""
                            />
                            <Typography>{`${weather.weatherReadings[0].probOfPrecipation}%`}</Typography>
                        </div>
                    </div>
                </>
            ) : (
                <CircularProgress />
            )}
        </div>
    );
};

export default WeatherInfo;
