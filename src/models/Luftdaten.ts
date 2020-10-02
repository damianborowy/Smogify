import Location from "../models/Location";

export type SensorDataValues = {
    value: number;
    value_type: string;
};

export type FetchedLuftdatenData = {
    location: {
        latitude: number;
        longitude: number;
    };
    sensordatavalues: SensorDataValues[];
    timestamp: Date;
};

export class SensorReading {
    constructor(
        public location: Location,
        public pm25?: number,
        public pm10?: number,
        public temperature?: number,
        public humidity?: number,
        public pressure?: number,
        public aqi?: number
    ) {}
}

export class LuftdatenData {
    public fetchDate: Date;
    public sensorReadings: SensorReading[];

    private constructor(fetchDate: Date, sensorReadings: SensorReading[]) {
        this.fetchDate = fetchDate;
        this.sensorReadings = sensorReadings;
    }

    public static fromLuftdaten(luftdatenData: FetchedLuftdatenData[]) {
        const list: number[] = [];

        const sensorReadings = luftdatenData.map((data) => {
            const sensorReading = new SensorReading(
                new Location(data.location.latitude, data.location.longitude)
            );

            data.sensordatavalues.forEach((reading) => {
                switch (reading.value_type) {
                    case "P1":
                        sensorReading.pm10 = reading.value;
                        list.push(reading.value);
                        break;
                    case "P2":
                        sensorReading.pm25 = reading.value;
                        break;
                    case "humidity":
                        sensorReading.humidity = reading.value;
                        break;
                    case "temperature":
                        sensorReading.temperature = reading.value;
                        break;
                    case "pressure":
                        sensorReading.pressure = reading.value;
                        break;
                }
            });

            // TODO:: implement AQI

            return sensorReading;
        });

        return new LuftdatenData(new Date(), sensorReadings);
    }
}
