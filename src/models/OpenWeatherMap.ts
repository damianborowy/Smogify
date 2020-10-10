import Location from "./Location";

export type OpenWeatherMapResponse = {
    list: {
        main: {
            temp: number;
            feels_like: number;
            pressure: number;
            humidity: number;
        };
        weather: {
            main: string;
        }[];
        wind: {
            speed: number;
            deg: number;
        };
        pop: number;
    }[];
    city: {
        name: string;
        coord: { lat: number; lon: number };
        country: string;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
};

export class OpenWeatherMapData {
    private constructor(
        public temp: number,
        public feelsLike: number,
        public pressure: number,
        public humidity: number,
        public windSpeed: number,
        public windDeg: number,
        public probOfPrecipation: number,
        public location: Location,
        public city: string,
        public sunrise: number,
        public sunset: number
    ) {}
}
