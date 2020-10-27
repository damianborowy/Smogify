import React from "react";
import { IconButton, Paper, Typography, useTheme } from "@material-ui/core";
import { Favorite, FavoriteBorder, Timeline } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { updateFavouriteStationData } from "../../../../store/pollution/actions";
import { updateFavouriteStations } from "../../../../store/userData/actions";
import { fetchWeatherData } from "../../../../store/weather/thunks";
import { getFavouriteLocationsData } from "../../../../utils/favouriteLocations";
import ColorsMeter from "../../../Shared/ColorsMeter";
import WeatherInfo from "../../../Shared/WeatherInfo";
import Location from "../../../../models/Location";
import styles from "../style.module.scss";
import _ from "lodash";

const NearbyInfo = () => {
    const weather = useSelector((state: RootState) => state.weather),
        userData = useSelector((state: RootState) => state.userData),
        luftdaten = useSelector((state: RootState) => state.pollution),
        dispatch = useDispatch(),
        theme = useTheme();

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
                    There seem to be no air pollution measuring station close to
                    you. Try adding some to favourites!
                </Typography>
            )}
            <div className={styles.weatherInfo}>
                <WeatherInfo weather={weather.nearbyWeather} />
            </div>
        </Paper>
    );
};

export default NearbyInfo;
