import React, { useEffect, useRef, useState } from "react";
import ReactMapboxGl, { MapContext } from "react-mapbox-gl";
import HeatmapDataSource from "../../models/HeatmapDataSource";
import Feature from "../../models/Feature";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LuftdatenData } from "../../models/Luftdaten";

const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1IjoidHltb290ZXV1c3oiLCJhIjoiY2tldmw3N3p6MTB1aTJxcDd3ZDIzdnUycyJ9.ZpNCPh7aJsDpg5uzTZIuUQ",
});

const MapPage = () => {
    const dataSource = useRef<HeatmapDataSource | null>(null),
        [isDataLoaded, setIsDataLoaded] = useState(false),
        locationData = useSelector((state: RootState) => state.locationData);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            const pollutionData: LuftdatenData[] = await fetch(
                "https://data.sensor.community/static/v2/data.1h.json"
            ).then((res) => res.json());

            if (isMounted) {
                dataSource.current = new HeatmapDataSource(
                    pollutionData.map(
                        (data) =>
                            new Feature(
                                +data.sensordatavalues[0].value,
                                +data.location.longitude,
                                +data.location.latitude
                            )
                    )
                );

                setIsDataLoaded(true);
            }
        })();

        return () => {
            isMounted = false;
        };
    });

    return (
        <Map
            // eslint-disable-next-line react/style-prop-object
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: "100%",
                width: "100%",
            }}
            center={[locationData.location.lng, locationData.location.lat]}
        >
            <MapContext.Consumer>
                {(map) => {
                    if (isDataLoaded) {
                        map.addSource("data", {
                            type: "geojson",
                            data: dataSource.current,
                        });

                        map.addLayer(
                            {
                                id: "data-heat",
                                type: "heatmap",
                                source: "data",
                                maxzoom: 15,
                                paint: {
                                    "heatmap-weight": {
                                        property: "dbh",
                                        type: "exponential",
                                        stops: [
                                            [1, 0],
                                            [62, 1],
                                        ],
                                    },
                                    "heatmap-intensity": {
                                        stops: [
                                            [11, 1],
                                            [15, 3],
                                        ],
                                    },
                                    "heatmap-color": [
                                        "interpolate",
                                        ["linear"],
                                        ["heatmap-density"],
                                        0,
                                        "rgba(236,222,239,0)",
                                        0.2,
                                        "rgb(208,209,230)",
                                        0.4,
                                        "rgb(166,189,219)",
                                        0.6,
                                        "rgb(103,169,207)",
                                        0.8,
                                        "rgb(28,144,153)",
                                    ],
                                    "heatmap-radius": {
                                        stops: [
                                            [11, 15],
                                            [15, 20],
                                        ],
                                    },
                                    "heatmap-opacity": {
                                        default: 1,
                                        stops: [
                                            [14, 1],
                                            [15, 0],
                                        ],
                                    },
                                },
                            },
                            "waterway-label"
                        );

                        map.addLayer(
                            {
                                id: "data-point",
                                type: "circle",
                                source: "data",
                                minzoom: 14,
                                paint: {
                                    "circle-radius": {
                                        property: "dbh",
                                        type: "exponential",
                                        stops: [
                                            [{ zoom: 15, value: 1 }, 5],
                                            [{ zoom: 15, value: 62 }, 10],
                                            [{ zoom: 22, value: 1 }, 20],
                                            [{ zoom: 22, value: 62 }, 50],
                                        ],
                                    },
                                    "circle-color": {
                                        property: "dbh",
                                        type: "exponential",
                                        stops: [
                                            [0, "rgba(236,222,239,0)"],
                                            [10, "rgb(236,222,239)"],
                                            [20, "rgb(208,209,230)"],
                                            [30, "rgb(166,189,219)"],
                                            [40, "rgb(103,169,207)"],
                                            [50, "rgb(28,144,153)"],
                                            [60, "rgb(1,108,89)"],
                                        ],
                                    },
                                    "circle-stroke-color": "white",
                                    "circle-stroke-width": 1,
                                    "circle-opacity": {
                                        stops: [
                                            [14, 0],
                                            [15, 1],
                                        ],
                                    },
                                },
                            },
                            "waterway-label"
                        );

                        return <></>;
                    }
                }}
            </MapContext.Consumer>
        </Map>
    );
};

export default MapPage;
