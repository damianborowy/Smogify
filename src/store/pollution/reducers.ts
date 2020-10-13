import {
    LuftdatenState,
    LuftdatenActionTypes,
    UPDATE_POLLUTION_DATA,
    UPDATE_NEARBY_STATION_DATA,
    UPDATE_FAVOURITE_STATION_DATA,
} from "./types";

const initialState: LuftdatenState = {
    pollutionData: null,
    nearbyStationData: null,
    favouriteStationsData: [],
};

export function pollutionReducer(
    state = initialState,
    action: LuftdatenActionTypes
): LuftdatenState {
    switch (action.type) {
        case UPDATE_POLLUTION_DATA:
            return {
                ...state,
                pollutionData: action.payload,
            };
        case UPDATE_NEARBY_STATION_DATA:
            return {
                ...state,
                nearbyStationData: action.payload,
            };
        case UPDATE_FAVOURITE_STATION_DATA:
            return {
                ...state,
                favouriteStationsData: action.payload,
            };
        default:
            return state;
    }
}
