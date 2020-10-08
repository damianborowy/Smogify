import Location from "../../models/Location";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { updateLocation } from "./actions";

export const updateLocationThunk = (): ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    Action<string>
> => async (dispatch) => {
    const location = await Location.getLocation();

    if (location) dispatch(updateLocation(location));
};
