import { IconButton, Paper } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
    clearSelectedStation,
    updateFavouriteStations,
} from "../../../store/userData/actions";
import styles from "./style.module.scss";
import { Close, FavoriteBorder, Favorite, Timeline } from "@material-ui/icons";
import ColorsMeter from "../../Shared/ColorsMeter";
import _ from "lodash";
import { updateFavouriteStationData } from "../../../store/pollution/actions";
import { getFavouriteLocationsData } from "../../../utils/favouriteLocations";
import { fetchWeatherData } from "../../../store/weather/thunks";
import WeatherInfo from "../../Shared/WeatherInfo";

const StationView = () => {
    const userData = useSelector((state: RootState) => state.userData),
        weather = useSelector((state: RootState) => state.weather),
        dispatch = useDispatch();

    const isStationFavourite = () => {
        for (let location of userData.favouriteStations)
            if (_.isEqual(location, userData.selectedStation!.location))
                return true;

        return false;
    };

    const toggleFavourite = () => {
        const newFavourites = userData.favouriteStations;

        if (isStationFavourite()) {
            const removedFavouriteIndex = newFavourites.findIndex((location) =>
                _.isEqual(location, userData.selectedStation!.location)
            );

            newFavourites.splice(removedFavouriteIndex, 1);
        } else {
            newFavourites.push(userData.selectedStation!.location);
        }

        dispatch(updateFavouriteStations(newFavourites));
        dispatch(
            updateFavouriteStationData(getFavouriteLocationsData(newFavourites))
        );
        dispatch(fetchWeatherData());
    };

    return (
        <div
            className={clsx(styles.base, {
                [styles.open]: userData.selectedStation,
                [styles.closed]: !userData.selectedStation,
            })}
        >
            <Paper className={styles.container} elevation={0} square>
                {userData.selectedStation && (
                    <>
                        <div className={styles.header}>
                            <IconButton>
                                <Timeline />
                            </IconButton>
                            <IconButton onClick={toggleFavourite}>
                                {isStationFavourite() ? (
                                    <Favorite />
                                ) : (
                                    <FavoriteBorder />
                                )}
                            </IconButton>
                            <IconButton
                                onClick={() => dispatch(clearSelectedStation())}
                            >
                                <Close />
                            </IconButton>
                        </div>
                        <div className={styles.readings}>
                            <div className={styles.reading}>
                                <ColorsMeter
                                    reading={userData.selectedStation}
                                    dataType="PM2.5"
                                    bgColor="none"
                                    showType
                                />
                            </div>
                            <div className={styles.reading}>
                                <ColorsMeter
                                    reading={userData.selectedStation}
                                    dataType="PM10"
                                    bgColor="none"
                                    showType
                                />
                            </div>
                        </div>
                        <div className={styles.body}>
                            <WeatherInfo weather={weather.selectedWeather} />
                        </div>
                    </>
                )}
            </Paper>
        </div>
    );
};

export default StationView;
