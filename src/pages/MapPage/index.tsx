import React, { useEffect, useRef, useState } from "react";
import ReactMapboxGl, { MapContext } from "react-mapbox-gl";
import HeatmapDataSource from "../../models/HeatmapDataSource";
import Feature from "../../models/Feature";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1IjoidHltb290ZXV1c3oiLCJhIjoiY2tldmw3N3p6MTB1aTJxcDd3ZDIzdnUycyJ9.ZpNCPh7aJsDpg5uzTZIuUQ",
});

const MapPage = () => {
    const locationData = useSelector((state: RootState) => state.location),
        luftdatenData = useSelector((state: RootState) => state.luftdaten),
        [dataSource, setDataSource] = useState<HeatmapDataSource | null>(null),
        counter = useRef(0);

    useEffect(() => {
        if (luftdatenData.pollutionData) {
            setDataSource(
                new HeatmapDataSource(
                    luftdatenData.pollutionData?.sensorReadings.map(
                        (data) =>
                            new Feature(
                                data.pm25!,
                                data.location.lng,
                                data.location.lat
                            )
                    )
                )
            );
        }
    }, [luftdatenData]);

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
                    if (dataSource) {
                        map.addSource("data" + counter.current, {
                            type: "geojson",
                            data: dataSource,
                        });

                        map.addLayer(
                            {
                                id: "data-heat" + counter.current,
                                type: "heatmap",
                                source: "data" + counter.current,
                                maxzoom: 15,
                                paint: {
                                    "heatmap-weight": {
                                        property: "dbh",
                                        type: "exponential",
                                        stops: [
                                            [1, 0],
                                            [300, 1],
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
                                        "rgba(0,0,0,0)",
                                        0.00001,
                                        "#009966",
                                        0.166,
                                        "#ffde33",
                                        0.333,
                                        "#ff9933",
                                        0.5,
                                        "#cc0033",
                                        0.666,
                                        "#660099",
                                        0.833,
                                        "#7e0023",
                                    ],
                                    "heatmap-radius": {
                                        stops: [
                                            [11, 15],
                                            [15, 5],
                                            [30, 1],
                                        ],
                                    },
                                    "heatmap-opacity": {
                                        default: 0.9,
                                        stops: [
                                            [14, 0.9],
                                            [15, 0],
                                        ],
                                    },
                                },
                            },
                            "waterway-label"
                        );

                        map.addLayer(
                            {
                                id: "data-point" + counter.current,
                                type: "circle",
                                source: "data" + counter.current,
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

                        counter.current++;

                        return <></>;
                    }
                }}
            </MapContext.Consumer>
        </Map>
    );
};

export default MapPage;
