import { store } from "..";
import Location from "../models/Location";
import { LuftdatenData, SensorReading } from "../models/Luftdaten";

export function getFavouriteLocationsData(
    locations: Location[],
    luftdaten?: LuftdatenData
): SensorReading[] {
    const { pollutionData } = store.getState().luftdaten;

    if (!luftdaten && pollutionData) luftdaten = pollutionData;

    if (luftdaten) {
        const pollutionMap = new Map<string, SensorReading>();

        luftdaten.sensorReadings.forEach((reading) =>
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
