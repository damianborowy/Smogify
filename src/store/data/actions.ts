import Location from "../../models/Location";
import { UPDATE_LOCATION, LocationActionTypes } from "./types";

export function updateLocation(location: Location): LocationActionTypes {
    return {
        type: UPDATE_LOCATION,
        payload: location,
    };
}
