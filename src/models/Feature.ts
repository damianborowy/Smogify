import { SensorReading } from "./Pollution";

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
