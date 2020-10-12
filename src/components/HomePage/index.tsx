import { IconButton, Paper, Typography } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import ColorsMeter from "../Shared/ColorsMeter";
import WeatherInfo from "../Shared/WeatherInfo";
import styles from "./style.module.scss";
import { updateFavouriteStations } from "../../store/userData/actions";
import { updateFavouriteStationData } from "../../store/luftdaten/actions";
import { getFavouriteLocationsData } from "../../utils/favouriteLocations";
import { updateFavouriteWeather } from "../../store/weather/actions";

const HomePage = () => {
    const weather = useSelector((state: RootState) => state.weather),
        userData = useSelector((state: RootState) => state.userData),
        luftdaten = useSelector((state: RootState) => state.luftdaten),
        dispatch = useDispatch();

    const removeFromFavourites = (index: number) => {
        const newFavourites = userData.favouriteStations;

        newFavourites.splice(index, 1);
        dispatch(updateFavouriteStations(newFavourites));
        dispatch(
            updateFavouriteStationData(getFavouriteLocationsData(newFavourites))
        );

        const newWeather = weather.favouriteWeather;
        newWeather.splice(index, 1);
        dispatch(updateFavouriteWeather(newWeather));
    };

    return (
        <Paper className={styles.container} elevation={0} square>
            <Typography variant="h6" style={{ marginBottom: 10 }}>
                Your location
            </Typography>
            <Paper className={styles.composedInfo}>
                <Typography style={{ padding: "12px 0" }}>
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
                    userData.favouriteStations.map((location, i) => (
                        <Paper
                            className={clsx(styles.composedInfo)}
                            key={`${location.lat},${location.lng}`}
                        >
                            <div className={styles.infoHeader}>
                                <Typography>
                                    {weather.favouriteWeather[i] &&
                                        weather.favouriteWeather[i].city}
                                </Typography>
                                <IconButton
                                    className={styles.favouriteIcon}
                                    onClick={() => removeFromFavourites(i)}
                                >
                                    <Favorite />
                                </IconButton>
                            </div>
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
                    <Typography>
                        You don't have any favourite stations yet. Add them from
                        Map view.
                    </Typography>
                )}
            </div>
        </Paper>
    );
};

export default HomePage;
