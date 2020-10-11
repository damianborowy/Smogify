import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ColorsMeter from "../Shared/ColorsMeter";
import WeatherInfo from "../Shared/WeatherInfo";
import styles from "./style.module.scss";

const HomePage = () => {
    const weather = useSelector((state: RootState) => state.weather),
        userData = useSelector((state: RootState) => state.userData),
        luftdaten = useSelector((state: RootState) => state.luftdaten);

    return (
        <Paper className={styles.container} elevation={0} square>
            <Typography variant="h6" style={{ marginBottom: 10 }}>
                Your location
            </Typography>
            <Paper className={styles.composedInfo}>
                <Typography>
                    {weather.nearbyWeather && weather.nearbyWeather.city}
                </Typography>
                {luftdaten.nearbyStationData ? (
                    <>
                        <ColorsMeter
                            dataType="PM2.5"
                            bgColor="none"
                            reading={luftdaten.nearbyStationData}
                            showType
                        />
                        <ColorsMeter
                            dataType="PM10"
                            bgColor="none"
                            reading={luftdaten.nearbyStationData}
                            showType
                        />
                    </>
                ) : (
                    "There seem to be no air pollution measuring station close to you. Try adding some to favourites!"
                )}

                <WeatherInfo weather={weather.nearbyWeather} />
            </Paper>
            <div className={styles.favourites}>
                <Typography variant="h6" style={{ marginBottom: 10 }}>
                    Favourite stations
                </Typography>
                {userData.favouriteStations.map((_, i) => (
                    <Paper className={styles.composedInfo} key={i}>
                        <Typography>
                            {weather.favouriteWeather[i] &&
                                weather.favouriteWeather[i].city}
                        </Typography>
                        <ColorsMeter
                            dataType="PM2.5"
                            bgColor="none"
                            reading={luftdaten.favouriteStationsData[i]}
                            showType
                        />
                        <ColorsMeter
                            dataType="PM10"
                            bgColor="none"
                            reading={luftdaten.favouriteStationsData[i]}
                            showType
                        />
                        <WeatherInfo weather={weather.favouriteWeather[i]} />
                    </Paper>
                ))}
            </div>
        </Paper>
    );
};

export default HomePage;
