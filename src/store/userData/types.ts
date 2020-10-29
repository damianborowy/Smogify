import Location from "../../models/Location";
import { PollutionSource, SensorReading } from "../../models/Pollution";

export const UPDATE_LOCATION = "UPDATE_LOCATION";
export const UPDATE_SELECTED_STATION = "UPDATE_SELECTED_STATION";
export const CLEAR_SELECTED_STATION = "CLEAR_SELECTED_STATION";
export const UPDATE_FAVOURITE_STATIONS = "UPDATE_FAVOURITE_STATIONS";
export const UPDATE_EXTERNAL_DATA_SOURCES = "UPDATE__EXTERNAL_DATA_SOURCES";

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

interface UpdateExternalDataSources {
    type: typeof UPDATE_EXTERNAL_DATA_SOURCES;
    payload: PollutionSource[];
}

export interface UserDataState {
    location: Location;
    selectedStation: SensorReading | null;
    favouriteStations: Location[];
    sources: PollutionSource[];
}

export type UserDataActionTypes =
    | UpdateLocation
    | UpdateSelectedStation
    | ClearSelectedStation
    | UpdateFavouriteStations
    | UpdateExternalDataSources;
