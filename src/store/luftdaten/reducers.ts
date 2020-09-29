import {
    LuftdatenState,
    LuftdatenActionTypes,
    UPDATE_POLLUTION_DATA,
} from "./types";

const initialState: LuftdatenState = {
    pollutionData: null,
};

export function luftdatenReducer(
    state = initialState,
    action: LuftdatenActionTypes
): LuftdatenState {
    switch (action.type) {
        case UPDATE_POLLUTION_DATA:
            return {
                ...state,
                pollutionData: action.payload,
            };
        default:
            return state;
    }
}
