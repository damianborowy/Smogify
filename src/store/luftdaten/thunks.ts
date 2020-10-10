import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { LuftdatenResponse, SensorReading } from "../../models/Luftdaten";
import { LuftdatenData } from "../../models/Luftdaten";
import { calculateDistance } from "../../utils/distance";
import {
    updateFavouriteStationData,
    updateNearblyStationData,
    updatePollutionData,
} from "./actions";
import { store } from "../../index";

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

    const favouriteLocations = store.getState().userData.favouriteStations;

    const favouriteStationsData: SensorReading[] = [];

    dispatch(updateFavouriteStationData(favouriteStationsData));
};

export const fetchNearbyStationData = (): ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    Action<string>
> => async (dispatch) => {
    const location = store.getState().userData.location;

    const luftdatenData: LuftdatenResponse[] = await fetch(
        `https://data.sensor.community/airrohr/v1/filter/area=${location.lat},${location.lng},5`
    ).then((res) => res.json());

    if (luftdatenData.length > 0) {
        const pollutionData = LuftdatenData.fromLuftdaten(luftdatenData)
            .sensorReadings.map((reading) => {
                return {
                    distance: calculateDistance(location, reading.location),
                    data: reading,
                };
            })
            .sort((a, b) => a.distance - b.distance);

        dispatch(updateNearblyStationData(pollutionData[0].data));
    }
};
