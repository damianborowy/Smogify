import { Typography } from "@material-ui/core";
import React from "react";
import { OpenWeatherMapData } from "../../../models/OpenWeatherMap";
import styles from "./style.module.scss";

interface WeatherInfoProps {
    weather: OpenWeatherMapData | null;
}

const WeatherInfo = ({ weather }: WeatherInfoProps) => {
    const displayWindInfo = () => {
        return weather && weather.weatherReadings[0].windDeg;
    };

    return (
        <div className={styles.container}>
            {weather ? (
                <>
                    <div className={styles.row}>
                        <div className={styles.item}>
                            <img
                                className={styles.icon}
                                src={`${process.env.PUBLIC_URL}/icons/wi-celsius.svg`}
                                alt=""
                            />
                            <div className={styles.temperatures}>
                                <div className={styles.item}>
                                    <Typography>Temperature</Typography>
                                    <Typography>
                                        {`${(
                                            weather.weatherReadings[0].temp -
                                            273
                                        ).toFixed(0)}°C`}
                                    </Typography>
                                </div>
                                <div className={styles.item}>
                                    <Typography>Feels like</Typography>
                                    <Typography>
                                        {weather.weatherReadings[0].feelsLike}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
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
                            <Typography>{`${weather.weatherReadings[0].humidity}%`}</Typography>
                        </div>
                        <div className={styles.item}>
                            <img
                                className={styles.icon}
                                src={`${process.env.PUBLIC_URL}/icons/wi-barometer.svg`}
                                alt=""
                            />
                            <Typography>{`${weather.weatherReadings[0].pressure}hPa`}</Typography>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.item}>
                            <img
                                className={styles.icon}
                                src={`${process.env.PUBLIC_URL}/icons/wi-raindrops.svg`}
                                alt=""
                            />
                            <Typography>{`${weather.weatherReadings[0].probOfPrecipation}%`}</Typography>
                        </div>
                        <div className={styles.item}>
                            <img
                                className={styles.icon}
                                src={`${process.env.PUBLIC_URL}/icons/wi-windy.svg`}
                                alt=""
                            />
                            <Typography>{displayWindInfo()}</Typography>
                        </div>
                        <div className={styles.item}>FORECAST</div>
                    </div>
                </>
            ) : (
                "Fetching..."
            )}
        </div>
    );
};

export default WeatherInfo;
