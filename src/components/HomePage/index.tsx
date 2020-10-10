import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import WeatherInfo from "../Shared/WeatherInfo";
import styles from "./style.module.scss";

const HomePage = () => {
    const weather = useSelector((state: RootState) => state.weather);

    return (
        <Paper className={styles.container} elevation={0} square>
            <Typography variant="h4">Home</Typography>
            <WeatherInfo weather={weather.nearbyWeather} />
            {weather.favouriteWeather.map((reading) => (
                <WeatherInfo weather={reading} />
            ))}
        </Paper>
    );
};

export default HomePage;
