import { OpenWeatherMapData } from "../../models/OpenWeatherMap";

export const UPDATE_NEARBY_WEATHER = "UPDATE_NEARBY_WEATHER";
export const UPDATE_SELECTED_WEATHER = "UPDATE_SELECTED_WEATHER";
export const UPDATE_FAVOURITE_WEATHER = "UPDATE_FAVOURITE_WEATHER";

interface UpdateNearbyWeather {
    type: typeof UPDATE_NEARBY_WEATHER;
    payload: OpenWeatherMapData;
}

interface UpdateSelectedWeather {
    type: typeof UPDATE_SELECTED_WEATHER;
    payload: OpenWeatherMapData;
}

interface UpdateFavouriteWeather {
    type: typeof UPDATE_FAVOURITE_WEATHER;
    payload: OpenWeatherMapData[];
}

export interface WeatherState {
    nearbyWeather: OpenWeatherMapData | null;
    selectedWeather: OpenWeatherMapData | null;
    favouriteWeather: OpenWeatherMapData[];
}

export type WeatherActionTypes =
    | UpdateNearbyWeather
    | UpdateSelectedWeather
    | UpdateFavouriteWeather;
