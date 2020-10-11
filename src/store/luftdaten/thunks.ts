import { ThunkType } from "..";
import { LuftdatenResponse } from "../../models/Luftdaten";
import { LuftdatenData } from "../../models/Luftdaten";
import { calculateDistance } from "../../utils/distance";
import {
    updateFavouriteStationData,
    updateNearblyStationData,
    updatePollutionData,
} from "./actions";
import { store } from "../../index";
import { getFavouriteLocationsData } from "../../utils/favouriteLocations";

export const fetchPollutionData = (): ThunkType => async (dispatch) => {
    const luftdatenData: LuftdatenResponse[] = await fetch(
        "https://data.sensor.community/static/v1/data.json"
    ).then((res) => res.json());

    const pollutionData = LuftdatenData.fromLuftdaten(luftdatenData);
    dispatch(updatePollutionData(pollutionData));

    const favouriteLocations = store.getState().userData.favouriteStations;
    const favouriteLocationsData = getFavouriteLocationsData(
        favouriteLocations,
        pollutionData
    );

    dispatch(updateFavouriteStationData(favouriteLocationsData));
};

export const fetchNearbyStationData = (): ThunkType => async (dispatch) => {
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
