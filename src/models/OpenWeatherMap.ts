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
            icon: string;
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

export type WeatherReading = {
    temp: number;
    feelsLike: number;
    pressure: number;
    humidity: number;
    windSpeed: number;
    windDeg: number;
    probOfPrecipation: number;
    weather: string;
    icon: string;
};

export class OpenWeatherMapData {
    public weatherReadings: WeatherReading[];
    public location: Location;
    public city: string;
    public sunrise: number;
    public sunset: number;

    constructor(data: OpenWeatherMapResponse, location: Location) {
        this.city = data.city.name;
        this.location = location;
        this.sunrise = data.city.sunrise;
        this.sunset = data.city.sunset;

        this.weatherReadings = data.list.map((reading) => {
            return {
                icon: reading.weather[0].icon,
                temp: reading.main.temp,
                feelsLike: reading.main.feels_like,
                pressure: reading.main.pressure,
                humidity: reading.main.humidity,
                windSpeed: reading.wind.speed,
                windDeg: reading.wind.deg,
                probOfPrecipation: reading.pop,
                weather: reading.weather[0].main,
            };
        });
    }
}
