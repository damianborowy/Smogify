import { ThunkType } from "..";
import { FetchedData } from "../../models/Pollution";
import { PollutionData } from "../../models/Pollution";
import { calculateDistance } from "../../utils/distance";
import {
    updateFavouriteStationData,
    updateFetchingState,
    updateNearblyStationData,
    updatePollutionData,
} from "./actions";
import { store } from "../../index";
import { getFavouriteLocationsData } from "../../utils/favouriteLocations";

export const fetchPollutionData = (): ThunkType => async (dispatch) => {
    dispatch(updateFetchingState(true));

    const externalSources = store.getState().userData.sources,
        pollutionData = new PollutionData();

    for (let source of externalSources) {
        if (source.enabled) {
            const response: FetchedData = await fetch(
                source.apiUrl
            ).then((res) => res.json());

            if (response.readings && Array.isArray(response.readings)) {
                if (!response.source) response.source = source.name;
                try {
                    const externalData = new PollutionData(response);
                    pollutionData.mergePollutionData(externalData);
                } catch (e) {}
            }
        }
    }

    dispatch(updatePollutionData(pollutionData));

    const favouriteLocations = store.getState().userData.favouriteStations;
    const favouriteLocationsData = getFavouriteLocationsData(
        favouriteLocations,
        pollutionData
    );

    dispatch(updateFavouriteStationData(favouriteLocationsData));
    dispatch(fetchNearbyStationData());
    dispatch(updateFetchingState(false));
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
                break;
            }
        }

        dispatch(updateNearblyStationData(bestStation));
    }
};
