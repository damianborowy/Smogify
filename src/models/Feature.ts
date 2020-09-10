export default class Feature {
    constructor(dbh: number, lat: number, lng: number) {
        return {
            type: "Feature",
            properties: { dbh },
            geometry: {
                type: "Point",
                coordinates: [lat, lng],
            },
        };
    }
}
