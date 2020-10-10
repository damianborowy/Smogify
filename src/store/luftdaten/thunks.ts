import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { LuftdatenResponse } from "../../models/Luftdaten";
import { LuftdatenData } from "../../models/Luftdaten";
import { updatePollutionData } from "./actions";

export const fetchPollutionData = (): ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    Action<string>
> => async (dispatch) => {
    const luftdatenData: LuftdatenResponse[] = await fetch(
        "https://data.sensor.community/static/v1/data.json"
    ).then((res) => res.json());

    const pollutionData = LuftdatenData.fromLuftdaten(luftdatenData);

    dispatch(updatePollutionData(pollutionData));
};
