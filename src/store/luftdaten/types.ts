import { LuftdatenData, SensorReading } from "../../models/Luftdaten";

export const UPDATE_POLLUTION_DATA = "UPDATE_POLLUTION_DATA";
export const UPDATE_NEARBY_STATION_DATA = "UPDATE_NEARBY_STATION_DATA";

interface UpdatePollutionData {
    type: typeof UPDATE_POLLUTION_DATA;
    payload: LuftdatenData;
}

interface UpdateNearbyStationData {
    type: typeof UPDATE_NEARBY_STATION_DATA;
    payload: SensorReading;
}

export interface LuftdatenState {
    pollutionData: LuftdatenData | null;
    nearbyStationData: SensorReading | null;
}

export type LuftdatenActionTypes =
    | UpdatePollutionData
    | UpdateNearbyStationData;
