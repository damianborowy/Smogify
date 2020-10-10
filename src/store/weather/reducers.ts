import {
    WeatherState,
    WeatherActionTypes,
    UPDATE_NEARBY_WEATHER,
    UPDATE_SELECTED_WEATHER,
    UPDATE_FAVOURITE_WEATHER,
} from "./types";

const initialState: WeatherState = {
    nearbyWeather: null,
    selectedWeather: null,
    favouriteWeather: [],
};

export function weatherReducer(
    state = initialState,
    action: WeatherActionTypes
): WeatherState {
    switch (action.type) {
        case UPDATE_NEARBY_WEATHER:
            return {
                ...state,
                nearbyWeather: action.payload,
            };
        case UPDATE_SELECTED_WEATHER:
            return {
                ...state,
                selectedWeather: action.payload,
            };
        case UPDATE_FAVOURITE_WEATHER:
            return {
                ...state,
                favouriteWeather: action.payload,
            };
        default:
            return state;
    }
}
