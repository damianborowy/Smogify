import { LuftdatenData } from "../../models/Luftdaten";
import { UPDATE_POLLUTION_DATA, LuftdatenActionTypes } from "./types";

export function updatePollutionData(
    pollutionData: LuftdatenData
): LuftdatenActionTypes {
    return {
        type: UPDATE_POLLUTION_DATA,
        payload: pollutionData,
    };
}
