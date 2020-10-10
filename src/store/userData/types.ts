import Location from "../../models/Location";
import { SensorReading } from "../../models/Luftdaten";

export const UPDATE_LOCATION = "UPDATE_LOCATION";
export const UPDATE_SELECTED_STATION = "UPDATE_SELECTED_STATION";
export const CLEAR_SELECTED_STATION = "CLEAR_SELECTED_STATION";
export const UPDATE_FAVOURITE_STATIONS = "UPDATE_FAVOURITE_STATIONS";

interface UpdateLocation {
    type: typeof UPDATE_LOCATION;
    payload: Location;
}

interface UpdateSelectedStation {
    type: typeof UPDATE_SELECTED_STATION;
    payload: SensorReading;
}

interface ClearSelectedStation {
    type: typeof CLEAR_SELECTED_STATION;
}

interface UpdateFavouriteStations {
    type: typeof UPDATE_FAVOURITE_STATIONS;
    payload: Location[];
}

export interface UserDataState {
    location: Location;
    selectedStation: SensorReading | null;
    favouriteStations: Location[];
}

export type UserDataActionTypes =
    | UpdateLocation
    | UpdateSelectedStation
    | ClearSelectedStation
    | UpdateFavouriteStations;
