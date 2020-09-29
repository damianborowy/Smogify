import { LuftdatenData } from "../../models/Luftdaten";

export const UPDATE_POLLUTION_DATA = "UPDATE_POLLUTION_DATA";

interface UpdatePollutionData {
    type: typeof UPDATE_POLLUTION_DATA;
    payload: LuftdatenData;
}

export interface LuftdatenState {
    pollutionData: LuftdatenData | null;
}

export type LuftdatenActionTypes = UpdatePollutionData;
