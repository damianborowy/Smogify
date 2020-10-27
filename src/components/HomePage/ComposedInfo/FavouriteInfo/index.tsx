import React from "react";
import { IconButton, Paper, Typography, useTheme } from "@material-ui/core";
import { Favorite, Timeline } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { updateFavouriteStationData } from "../../../../store/pollution/actions";
import { updateFavouriteStations } from "../../../../store/userData/actions";
import { updateFavouriteWeather } from "../../../../store/weather/actions";
import { getFavouriteLocationsData } from "../../../../utils/favouriteLocations";
import ColorsMeter from "../../../Shared/ColorsMeter";
import WeatherInfo from "../../../Shared/WeatherInfo";
import Location from "../../../../models/Location";
import styles from "../style.module.scss";
import clsx from "clsx";

interface FavouriteInfoProps {
    location?: Location;
    i?: number;
}

const FavouriteInfo = ({ location, i }: FavouriteInfoProps) => {
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

    return (
        <>
            {location && i?.toString() ? (
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
                        <IconButton onClick={() => removeFromFavourites(i)}>
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
                        <WeatherInfo weather={weather.favouriteWeather[i]} />
                    </div>
                </Paper>
            ) : (
                <></>
            )}
        </>
    );
};

export default FavouriteInfo;
