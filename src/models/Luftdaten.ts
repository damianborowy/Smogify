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
        public aqi?: number,
        public aqi25?: number,
        public aqi10?: number
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

            this.calculateAQI(sensorReading);

            return sensorReading;
        });

        return new LuftdatenData(new Date(), sensorReadings);
    }

    public static calculateAQI(reading: SensorReading) {
        let pm25index = 0;
        let pm10index = 0;

        if (reading.pm25) {
            const { pm25 } = reading;

            if (pm25 < 13.1) pm25index = 1;
            else if (pm25 < 35.1) pm25index = 2;
            else if (pm25 < 55.1) pm25index = 3;
            else if (pm25 < 75.1) pm25index = 4;
            else if (pm25 < 110.1) pm25index = 5;
            else pm25index = 6;

            reading.aqi25 = pm25index;
        }

        if (reading.pm10) {
            const { pm10 } = reading;

            if (pm10 < 20.1) pm10index = 1;
            else if (pm10 < 50.1) pm10index = 2;
            else if (pm10 < 80.1) pm10index = 3;
            else if (pm10 < 110.1) pm10index = 4;
            else if (pm10 < 150.1) pm10index = 5;
            else pm10index = 6;

            reading.aqi10 = pm10index;
        }

        reading.aqi = Math.max(pm25index, pm10index);
    }
}
