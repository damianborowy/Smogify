import Location from "./Location";

export type ExternalSource = {
    name: string;
    apiUrl: string;
};

export type FetchedData = {
    source: string;
    readings: {
        lat: number;
        lng: number;
        pm25?: number;
        pm10?: number;
        temperature?: number;
    }[];
};

export type TemperatureGroups = {
    name: string;
    minValue: number;
    maxValue: number;
};

export class SensorReading {
    constructor(
        public location: Location,
        public source: string,
        public pm25?: number,
        public pm10?: number,
        public temperature?: number,
        public temperatureGroup?: number,
        public aqi?: number,
        public aqi25?: number,
        public aqi10?: number
    ) {}
}

export const aqiColors = [
    "rgb(114, 213, 40)",
    "rgb(240, 223, 15)",
    "rgb(240, 124, 47)",
    "rgb(239, 42, 54)",
    "rgb(185, 0, 92)",
    "rgb(132, 0, 132)",
];

export const temperatureColors = [
    "rgb(0, 192, 248)",
    "rgb(72, 232, 248)",
    "rgb(128, 248, 248)",
    "rgb(48, 208, 0)",
    "rgb(128, 248, 0)",
    "rgb(200, 248, 80)",
    "rgb(248, 248, 0)",
    "rgb(245, 149, 18)",
    "rgb(245, 115, 18)",
    "rgb(224, 30, 30)",
];

export const temperatureGroupNames = [
    "Extremely cold",
    "Very cold",
    "Cold",
    "Quite cold",
    "Quite cold",
    "Warm",
    "Very warm",
    "Hot",
    "Very hot",
    "Extremely hot",
];

function generateTemperatureGroups(
    minTemp: number,
    maxTemp: number,
    step: number
) {
    const groups: TemperatureGroups[] = new Array(
        (maxTemp - minTemp) / step + 2
    ).fill(0);

    return groups.map((_, i) => {
        return {
            minValue:
                i === 0 ? Number.MIN_SAFE_INTEGER : minTemp + (i - 1) * step,
            maxValue:
                i === groups.length - 1
                    ? Number.MAX_SAFE_INTEGER
                    : minTemp + i * step,
            name: temperatureGroupNames[i],
        };
    });
}

export const temperatureGroups = generateTemperatureGroups(-10, 30, 5);

export const pm25Groups = [
    [0, 13],
    [13, 35],
    [35, 55],
    [55, 75],
    [75, 110],
    [110, Number.MAX_SAFE_INTEGER],
];

export const pm10Groups = [
    [0, 20],
    [20, 50],
    [50, 80],
    [80, 110],
    [110, 150],
    [150, Number.MAX_SAFE_INTEGER],
];

export class PollutionData {
    public sensorReadings: SensorReading[];

    public constructor(pollutionData: FetchedData) {
        const sensorReadings = pollutionData.readings.map((data) => {
            if (!data.lat || !data.lng) throw new Error("Incorrect data");

            const sensorReading = new SensorReading(
                new Location(data.lat, data.lng),
                pollutionData.source
            );

            if (data.pm10) sensorReading.pm10 = data.pm10;
            if (data.pm25) sensorReading.pm25 = data.pm25;
            if (data.temperature) sensorReading.temperature = data.temperature;

            return sensorReading;
        });

        const coalescedReadings = this.coalesceReadings(sensorReadings);

        coalescedReadings.forEach((reading) => this.deriveProps(reading));

        this.sensorReadings = coalescedReadings;
    }

    public mergePollutionData = (data: PollutionData) => {
        this.sensorReadings.push(...data.sensorReadings);
    };

    private coalesceReadings(readings: SensorReading[]) {
        const tempReadings = readings.map((reading) => {
            return {
                id: `${reading.location.lat} ${reading.location.lng}`,
                reading,
            };
        });

        const map = new Map<string, SensorReading>();

        tempReadings.forEach((readingObj) => {
            if (map.has(readingObj.id)) {
                const existingReading = map.get(readingObj.id)!;

                map.set(
                    readingObj.id,
                    this.mergeReadings(existingReading, readingObj.reading)
                );
            } else map.set(readingObj.id, readingObj.reading);
        });

        return Array.from(map.values());
    }

    private mergeReadings = (existing: SensorReading, other: SensorReading) => {
        if (!existing.pm10) existing.pm10 = other.pm10;
        if (!existing.pm25) existing.pm25 = other.pm25;
        if (!existing.temperature) existing.temperature = other.temperature;

        return existing;
    };

    private deriveProps(reading: SensorReading) {
        this.deriveAqi(reading);
        this.deriveTemperature(reading);
    }

    private deriveAqi(reading: SensorReading) {
        let pm25index = 0;
        let pm10index = 0;

        if (reading.pm25) {
            const { pm25 } = reading;

            for (let i = 0; i < pm25Groups.length; i++) {
                if (pm25 < pm25Groups[i][1]) {
                    pm25index = i + 1;
                    break;
                }
            }

            reading.aqi25 = pm25index;
        }

        if (reading.pm10) {
            const { pm10 } = reading;

            for (let i = 0; i < pm10Groups.length; i++) {
                if (pm10 < pm10Groups[i][1]) {
                    pm10index = i + 1;
                    break;
                }
            }

            reading.aqi10 = pm10index;
        }

        reading.aqi = Math.max(pm25index, pm10index);
    }

    private deriveTemperature(reading: SensorReading) {
        if (!reading.temperature) return;

        for (let i = 0; i < temperatureGroups.length; i++) {
            if (
                temperatureGroups[i].minValue < reading.temperature &&
                reading.temperature < temperatureGroups[i].maxValue
            ) {
                reading.temperatureGroup = i + 1;
            }
        }
    }
}
