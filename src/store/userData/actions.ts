import Location from "../../models/Location";
import { PollutionSource, SensorReading } from "../../models/Pollution";
import {
    CLEAR_SELECTED_STATION,
    UPDATE_EXTERNAL_DATA_SOURCES,
    UPDATE_FAVOURITE_STATIONS,
    UPDATE_LOCATION,
    UPDATE_SELECTED_STATION,
    UserDataActionTypes,
} from "./types";

export function updateLocation(location: Location): UserDataActionTypes {
    return {
        type: UPDATE_LOCATION,
        payload: location,
    };
}

export function updateSelectedStation(
    selectedStation: SensorReading
): UserDataActionTypes {
    return {
        type: UPDATE_SELECTED_STATION,
        payload: selectedStation,
    };
}

export function clearSelectedStation(): UserDataActionTypes {
    return {
        type: CLEAR_SELECTED_STATION,
    };
}

export function updateFavouriteStations(
    favouriteStations: Location[]
): UserDataActionTypes {
    return {
        type: UPDATE_FAVOURITE_STATIONS,
        payload: favouriteStations,
    };
}

export function updateExternalDataSources(
    externalSources: PollutionSource[]
): UserDataActionTypes {
    return {
        type: UPDATE_EXTERNAL_DATA_SOURCES,
        payload: externalSources,
    };
}
