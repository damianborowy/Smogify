import { Action, CombinedState } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "..";
import { store } from "../..";
import Location from "../../models/Location";
import {
    OpenWeatherMapData,
    OpenWeatherMapResponse,
} from "../../models/OpenWeatherMap";
import { LuftdatenState } from "../luftdaten/types";
import { SettingsState } from "../settings/types";
import { UserDataState } from "../userData/types";
import {
    updateFavouriteWeather,
    updateNearbyWeather,
    updateSelectedWeather,
} from "./actions";

type DispatchType = ThunkDispatch<
    CombinedState<{
        settings: SettingsState;
        userData: UserDataState;
        luftdaten: LuftdatenState;
    }>,
    unknown,
    Action<string>
>;

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
        `http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}&appid=85c5219a223ac8fb2bdc72b28f2d8d8b`
    ).then((res) => res.json());

    return new OpenWeatherMapData(openWeatherMapData, location);
}

export const fetchWeatherData = (
    location?: Location
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
    dispatch
) => {
    if (!location) await fetchNearbyAndFavourite(dispatch);
    else await fetchSelected(location, dispatch);
};
