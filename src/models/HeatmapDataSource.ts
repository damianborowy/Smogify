import Feature from "./Feature";

export default class HeatmapDataSource {
    constructor(features: Feature[]) {
        return {
            type: "FeatureCollection",
            features,
        };
    }
}
