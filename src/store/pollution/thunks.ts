import { ThunkType } from "..";
import {
    ExternalSource,
    ExternalSourceResponse,
    LuftdatenResponse,
} from "../../models/Pollution";
import { PollutionData } from "../../models/Pollution";
import { calculateDistance } from "../../utils/distance";
import {
    updateFavouriteStationData,
    updateNearblyStationData,
    updatePollutionData,
} from "./actions";
import { store } from "../../index";
import { getFavouriteLocationsData } from "../../utils/favouriteLocations";

export const fetchPollutionData = (): ThunkType => async (dispatch) => {
    const luftdatenResponse: LuftdatenResponse[] = await fetch(
        "https://data.sensor.community/static/v1/data.json"
    ).then((res) => res.json());

    const pollutionData = PollutionData.fromLuftdaten(luftdatenResponse);

    const externalSources = store.getState().userData.externalSources;
    const externalSourcesData: ExternalSourceResponse[] = [];

    for (let source of externalSources) {
        const response: ExternalSourceResponse[] = await fetch(
            source.apiUrl
        ).then((res) => res.json());

        externalSourcesData.push(...response);
    }

    const externalData = PollutionData.fromExternalSource(externalSourcesData);

    pollutionData.mergePollutionData(externalData);

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
        const pollutionData = PollutionData.fromLuftdaten(luftdatenData)
            .sensorReadings.map((reading) => {
                return {
                    distance: calculateDistance(location, reading.location),
                    data: reading,
                };
            })
            .sort((a, b) => a.distance - b.distance);

        let bestStation = null;

        for (let reading of pollutionData) {
            if (reading.data.pm10 || reading.data.pm25) {
                bestStation = reading.data;
                break;
            }
        }

        dispatch(updateNearblyStationData(bestStation));
    }
};
