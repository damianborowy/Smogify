import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { LuftdatenData } from "../../models/Luftdaten";

export const fetchPollutionData = (): ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    Action<string>
> => async (dispatch) => {
    const pollutionData: LuftdatenData[] = await fetch(
        "https://data.sensor.community/static/v2/data.1h.json"
    ).then((res) => res.json());

    console.log(pollutionData);
};
