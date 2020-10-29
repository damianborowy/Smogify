import { PollutionData, SensorReading } from "../../models/Pollution";
import {
    UPDATE_POLLUTION_DATA,
    LuftdatenActionTypes,
    UPDATE_NEARBY_STATION_DATA,
    UPDATE_FAVOURITE_STATION_DATA,
    UPDATE_FETCHING_STATE,
} from "./types";

export function updatePollutionData(
    pollutionData: PollutionData
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

export function updateFetchingState(isFetching: boolean): LuftdatenActionTypes {
    return {
        type: UPDATE_FETCHING_STATE,
        payload: isFetching,
    };
}
