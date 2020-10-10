import Location from "../../models/Location";
import {
    UserDataState,
    UserDataActionTypes,
    UPDATE_LOCATION,
    UPDATE_SELECTED_STATION,
    CLEAR_SELECTED_STATION,
    UPDATE_FAVOURITE_STATIONS,
} from "./types";

const initialState: UserDataState = {
    location: new Location(51.11, 17.033),
    selectedStation: null,
    favouriteStations: [],
};

export function userDataReducer(
    state = initialState,
    action: UserDataActionTypes
): UserDataState {
    switch (action.type) {
        case UPDATE_LOCATION:
            return {
                ...state,
                location: action.payload,
            };
        case UPDATE_SELECTED_STATION:
            return {
                ...state,
                selectedStation: action.payload,
            };
        case CLEAR_SELECTED_STATION:
            return {
                ...state,
                selectedStation: null,
            };
        case UPDATE_FAVOURITE_STATIONS:
            return {
                ...state,
                favouriteStations: action.payload,
            };
        default:
            return state;
    }
}
