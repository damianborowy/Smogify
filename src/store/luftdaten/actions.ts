import { LuftdatenData, SensorReading } from "../../models/Luftdaten";
import {
    UPDATE_POLLUTION_DATA,
    LuftdatenActionTypes,
    UPDATE_NEARBY_STATION_DATA,
    UPDATE_FAVOURITE_STATION_DATA,
} from "./types";

export function updatePollutionData(
    pollutionData: LuftdatenData
): LuftdatenActionTypes {
    return {
        type: UPDATE_POLLUTION_DATA,
        payload: pollutionData,
    };
}

export function updateNearblyStationData(
    reading: SensorReading | null
): LuftdatenActionTypes {
    return {
        type: UPDATE_NEARBY_STATION_DATA,
        payload: reading,
    };
}

export function updateFavouriteStationData(
    readings: SensorReading[]
): LuftdatenActionTypes {
    return {
        type: UPDATE_FAVOURITE_STATION_DATA,
        payload: readings,
    };
}
