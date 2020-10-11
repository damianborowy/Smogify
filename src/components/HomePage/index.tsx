import { Paper, Typography } from "@material-ui/core";
import clsx from "clsx";
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
                    <Typography>
                        There seem to be no air pollution measuring station
                        close to you. Try adding some to favourites!
                    </Typography>
                )}

                <WeatherInfo weather={weather.nearbyWeather} />
            </Paper>
            <Typography variant="h6" style={{ marginTop: 30 }}>
                Favourite stations
            </Typography>
            <div className={styles.favourites}>
                {userData.favouriteStations.length > 0 ? (
                    userData.favouriteStations.map((_, i) => (
                        <Paper className={clsx(styles.composedInfo)} key={i}>
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
                            <WeatherInfo
                                weather={weather.favouriteWeather[i]}
                            />
                        </Paper>
                    ))
                ) : (
                    <Typography>You don't have any favourite stations yet. Add them from Map view.</Typography>
                )}
            </div>
        </Paper>
    );
};

export default HomePage;
