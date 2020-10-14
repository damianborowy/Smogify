import { ThunkType } from "..";
import { FetchedData } from "../../models/Pollution";
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
    const luftdatenResponse: FetchedData = await fetch(
        "https://us-central1-smogify-data.cloudfunctions.net/luftdatenReadings"
    ).then((res) => res.json());

    const pollutionData = new PollutionData(luftdatenResponse);

    const externalSources = store.getState().userData.externalSources;

    for (let source of externalSources) {
        const response: FetchedData = await fetch(source.apiUrl).then((res) =>
            res.json()
        );

        if (Array.isArray(response)) {
            try {
                const externalData = new PollutionData(response);
                pollutionData.mergePollutionData(externalData);
            } catch (e) {}
        }
    }

    dispatch(updatePollutionData(pollutionData));

    const favouriteLocations = store.getState().userData.favouriteStations;
    const favouriteLocationsData = getFavouriteLocationsData(
        favouriteLocations,
        pollutionData
    );

    dispatch(updateFavouriteStationData(favouriteLocationsData));
};

export const fetchNearbyStationData = (): ThunkType => async (dispatch) => {
    const location = store.getState().userData.location,
        pollutionData = store.getState().pollution.pollutionData;

    if (pollutionData && pollutionData.sensorReadings) {
        const data = pollutionData.sensorReadings
            .concat(
                pollutionData?.sensorReadings.filter(
                    (reading) => reading.source !== "Luftdaten"
                ) ?? []
            )
            .map((reading) => {
                return {
                    distance: calculateDistance(location, reading.location),
                    data: reading,
                };
            })
            .sort((a, b) => a.distance - b.distance);

        let bestStation = null;

        for (let reading of data) {
            if (reading.data.pm10 || reading.data.pm25) {
                bestStation = reading.data;
                console.log(bestStation);
                break;
            }
        }

        dispatch(updateNearblyStationData(bestStation));
    }
};
