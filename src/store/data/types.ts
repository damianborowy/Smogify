import Location from "../../models/Location";

export const UPDATE_LOCATION = "UPDATE_LOCATION";

interface UpdateLocation {
    type: typeof UPDATE_LOCATION;
    payload: Location;
}

export interface LocationState {
    location: Location;
}

export type LocationActionTypes = UpdateLocation;
