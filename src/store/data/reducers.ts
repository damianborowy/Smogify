import Location from "../../models/Location";
import { LocationState, LocationActionTypes, UPDATE_LOCATION } from "./types";

const initialState: LocationState = {
    location: new Location(51.11, 17.033),
};

export function locationReducer(
    state = initialState,
    action: LocationActionTypes
): LocationState {
    switch (action.type) {
        case UPDATE_LOCATION:
            return {
                ...state,
                location: action.payload,
            };
        default:
            return state;
    }
}
