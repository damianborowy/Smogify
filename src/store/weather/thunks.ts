import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { store } from "../..";
import Location from "../../models/Location";
import {
    OpenWeatherMapData,
    OpenWeatherMapResponse,
} from "../../models/OpenWeatherMap";

export const fetchWeatherData = (
    location?: Location
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
    dispatch
) => {
    location = location ?? store.getState().userData.location;

    const openWeatherMapData: OpenWeatherMapResponse = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}&appid=85c5219a223ac8fb2bdc72b28f2d8d8b`
    ).then((res) => res.json());

    console.log(new OpenWeatherMapData(openWeatherMapData, location));
};
