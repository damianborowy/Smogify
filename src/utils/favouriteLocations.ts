import { store } from "..";
import Location from "../models/Location";
import { PollutionData, SensorReading } from "../models/Pollution";

export function getFavouriteLocationsData(
    locations: Location[],
    pollution?: PollutionData
): SensorReading[] {
    const { pollutionData } = store.getState().pollution;

    if (!pollution && pollutionData) pollution = pollutionData;

    if (pollution) {
        const pollutionMap = new Map<string, SensorReading>();

        pollution.sensorReadings.forEach((reading) =>
            pollutionMap.set(
                `${reading.location.lat},${reading.location.lng}`,
                reading
            )
        );

        const favouriteReadings = locations.map(
            (location) => pollutionMap.get(`${location.lat},${location.lng}`)!
        );

        return favouriteReadings;
    } else return [];
}
