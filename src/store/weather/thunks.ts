import { DispatchType, ThunkType } from "..";
import { store } from "../..";
import Location from "../../models/Location";
import {
    OpenWeatherMapData,
    OpenWeatherMapResponse,
} from "../../models/OpenWeatherMap";
import {
    updateFavouriteWeather,
    updateNearbyWeather,
    updateSelectedWeather,
} from "./actions";

async function fetchNearbyAndFavourite(dispatch: DispatchType) {
    const nearbyLocation = store.getState().userData.location,
        favouriteLocations = store.getState().userData.favouriteStations;

    const nearbyWeather = await fetchWeather(nearbyLocation);

    dispatch(updateNearbyWeather(nearbyWeather));

    const favouriteWeather: OpenWeatherMapData[] = [];

    for (let location of favouriteLocations) {
        favouriteWeather.push(await fetchWeather(location));
    }

    dispatch(updateFavouriteWeather(favouriteWeather));
}

async function fetchSelected(location: Location, dispatch: DispatchType) {
    const selectedWeather = await fetchWeather(location);

    dispatch(updateSelectedWeather(selectedWeather));
}

async function fetchWeather(location: Location) {
    const openWeatherMapData: OpenWeatherMapResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}&appid=85c5219a223ac8fb2bdc72b28f2d8d8b`
    ).then((res) => res.json());

    return new OpenWeatherMapData(openWeatherMapData, location);
}

export const fetchWeatherData = (location?: Location): ThunkType => async (
    dispatch
) => {
    if (!location) await fetchNearbyAndFavourite(dispatch);
    else await fetchSelected(location, dispatch);
};
