import { PollutionData, SensorReading } from "../../models/Pollution";

export const UPDATE_POLLUTION_DATA = "UPDATE_POLLUTION_DATA";
export const UPDATE_NEARBY_STATION_DATA = "UPDATE_NEARBY_STATION_DATA";
export const UPDATE_FAVOURITE_STATION_DATA = "UPDATE_FAVOURITE_STATION_DATA";

interface UpdatePollutionData {
    type: typeof UPDATE_POLLUTION_DATA;
    payload: PollutionData;
}

interface UpdateNearbyStationData {
    type: typeof UPDATE_NEARBY_STATION_DATA;
    payload: SensorReading | null;
}

interface UpdateFavouriteStationData {
    type: typeof UPDATE_FAVOURITE_STATION_DATA;
    payload: SensorReading[];
}

export interface LuftdatenState {
    pollutionData: PollutionData | null;
    nearbyStationData: SensorReading | null;
    favouriteStationsData: SensorReading[];
}

export type LuftdatenActionTypes =
    | UpdatePollutionData
    | UpdateNearbyStationData
    | UpdateFavouriteStationData;