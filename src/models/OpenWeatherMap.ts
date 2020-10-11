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
            id: number;
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

function getIconFromId(id: number, iconCode: string) {
    let icon: string;

    if (id < 300) icon = "wi-thunderstorm";
    else if (id < 400) icon = "wi-showers";
    else if (id < 600) icon = "wi-rain";
    else if (id < 700) icon = "wi-snow";
    else if (id < 800) icon = "wi-fog";
    else if (id === 800)
        icon = iconCode === "01d" ? "wi-day-sunny" : "wi-night-clear";
    else if (id === 801)
        icon = iconCode === "02d" ? "wi-day-cloudy" : "wi-night-cloudy";
    else icon = "wi-cloudy";

    return icon;
}

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
                icon: getIconFromId(
                    reading.weather[0].id,
                    reading.weather[0].icon
                ),
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
