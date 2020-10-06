import { SensorReading } from "./Luftdaten";

export default class Feature {
    constructor(dbh: number, sensorReading: SensorReading) {
        return {
            type: "Feature",
            properties: { dbh, sensorReading },
            geometry: {
                type: "Point",
                coordinates: [
                    sensorReading.location.lng,
                    sensorReading.location.lat,
                ],
            },
        };
    }
}
