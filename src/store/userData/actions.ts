import Location from "../../models/Location";
import { SensorReading } from "../../models/Luftdaten";
import {
    CLEAR_SELECTED_STATION,
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
