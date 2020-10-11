import Location from "../../models/Location";
import { ThunkType } from "..";
import { updateLocation } from "./actions";

export const updateLocationThunk = (): ThunkType => async (dispatch) => {
    const location = await Location.getLocation();

    if (location) dispatch(updateLocation(location));
};
