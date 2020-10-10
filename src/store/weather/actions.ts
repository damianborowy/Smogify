import { OpenWeatherMapData } from "../../models/OpenWeatherMap";
import {
    UPDATE_FAVOURITE_WEATHER,
    UPDATE_NEARBY_WEATHER,
    UPDATE_SELECTED_WEATHER,
    WeatherActionTypes,
} from "./types";

export function updateNearbyWeather(
    reading: OpenWeatherMapData
): WeatherActionTypes {
    return {
        type: UPDATE_NEARBY_WEATHER,
        payload: reading,
    };
}

export function updateSelectedWeather(
    reading: OpenWeatherMapData
): WeatherActionTypes {
    return {
        type: UPDATE_SELECTED_WEATHER,
        payload: reading,
    };
}

export function updateFavouriteWeather(
    readings: OpenWeatherMapData[]
): WeatherActionTypes {
    return {
        type: UPDATE_FAVOURITE_WEATHER,
        payload: readings,
    };
}
