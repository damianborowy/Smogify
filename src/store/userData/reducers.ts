import Location from "../../models/Location";
import {
    UserDataState,
    UserDataActionTypes,
    UPDATE_LOCATION,
    UPDATE_SELECTED_STATION,
    CLEAR_SELECTED_STATION,
    UPDATE_FAVOURITE_STATIONS,
    UPDATE_EXTERNAL_DATA_SOURCES,
} from "./types";

const initialState: UserDataState = {
    location: new Location(51.11, 17.033),
    selectedStation: null,
    favouriteStations: [],
    externalSources: [
        {
            name: "GIOŚ",
            apiUrl:
                "https://us-central1-smogify-data.cloudfunctions.net/giosReadings",
        },
    ],
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
        case UPDATE_EXTERNAL_DATA_SOURCES:
            return {
                ...state,
                externalSources: action.payload,
            };
        default:
            return state;
    }
}
