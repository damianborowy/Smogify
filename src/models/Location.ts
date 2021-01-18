export default class Location {
    constructor(public lat: number, public lng: number) {}

    static async getLocation(): Promise<Location | null> {
        if ("geolocation" in navigator) {
            const { coords } = await this.getPositionAsPromise();
            return new Location(coords.latitude, coords.longitude);
        } else {
            return null;
        }
    }

    private static getPositionAsPromise(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => reject(error)
            );
        });
    }
}
