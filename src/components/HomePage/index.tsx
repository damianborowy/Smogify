import { IconButton, Paper, Typography, useTheme } from "@material-ui/core";
import { Favorite, Timeline, FavoriteBorder } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import ColorsMeter from "../Shared/ColorsMeter";
import WeatherInfo from "../Shared/WeatherInfo";
import styles from "./style.module.scss";
import { updateFavouriteStations } from "../../store/userData/actions";
import { updateFavouriteStationData } from "../../store/pollution/actions";
import { getFavouriteLocationsData } from "../../utils/favouriteLocations";
import { updateFavouriteWeather } from "../../store/weather/actions";
import _ from "lodash";
import { fetchWeatherData } from "../../store/weather/thunks";
import Location from "../../models/Location";
import withAppBar from "../../utils/withAppBar";

const HomePage = () => {
    const weather = useSelector((state: RootState) => state.weather),
        userData = useSelector((state: RootState) => state.userData),
        luftdaten = useSelector((state: RootState) => state.pollution),
        dispatch = useDispatch(),
        theme = useTheme();

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

    const isNearbyFavourite = (nearbyLocation: Location) => {
        for (let location of userData.favouriteStations)
            if (_.isEqual(location, nearbyLocation)) return true;

        return false;
    };

    const toggleNearbyFavourite = () => {
        const newFavourites = userData.favouriteStations,
            nearbyLocation = luftdaten.nearbyStationData?.location;

        if (nearbyLocation) {
            if (!isNearbyFavourite(nearbyLocation)) {
                newFavourites.push(nearbyLocation);
            } else {
                const removedFavouriteIndex = newFavourites.findIndex(
                    (location) => _.isEqual(location, nearbyLocation)
                );

                newFavourites.splice(removedFavouriteIndex, 1);
            }

            dispatch(updateFavouriteStations(newFavourites));
            dispatch(
                updateFavouriteStationData(
                    getFavouriteLocationsData(newFavourites)
                )
            );
            dispatch(fetchWeatherData());
        }
    };

    return (
        <Paper className={styles.container} elevation={0} square>
            <Typography variant="h6" style={{ marginBottom: 10 }}>
                Your location
            </Typography>
            <Paper
                className={styles.composedInfo}
                style={{
                    backgroundColor:
                        theme.palette.type === "dark" ? "#252525" : "#f8f8f8",
                }}
            >
                <div className={styles.infoHeader}>
                    <Typography style={{ padding: "12px 0" }}>
                        {weather.nearbyWeather && weather.nearbyWeather.city}
                    </Typography>
                    <IconButton className={styles.icon}>
                        <Timeline />
                    </IconButton>
                    <IconButton onClick={toggleNearbyFavourite}>
                        {isNearbyFavourite(
                            luftdaten.nearbyStationData?.location!
                        ) ? (
                            <Favorite />
                        ) : (
                            <FavoriteBorder />
                        )}
                    </IconButton>
                </div>
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
                <div className={styles.weatherInfo}>
                    <WeatherInfo weather={weather.nearbyWeather} />
                </div>
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
                            style={{
                                backgroundColor:
                                    theme.palette.type === "dark"
                                        ? "#252525"
                                        : "#f8f8f8",
                            }}
                        >
                            <div className={styles.infoHeader}>
                                <Typography>
                                    {weather.favouriteWeather[i] &&
                                        weather.favouriteWeather[i].city}
                                </Typography>
                                <IconButton className={styles.icon}>
                                    <Timeline />
                                </IconButton>
                                <IconButton
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
                            <div className={styles.weatherInfo}>
                                <WeatherInfo
                                    weather={weather.favouriteWeather[i]}
                                />
                            </div>
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

export default withAppBar(HomePage);
