import React, { useState, useEffect } from "react";
import ReactMapboxGl, { MapContext } from "react-mapbox-gl";

const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1IjoidHltb290ZXV1c3oiLCJhIjoiY2tldmw3N3p6MTB1aTJxcDd3ZDIzdnUycyJ9.ZpNCPh7aJsDpg5uzTZIuUQ",
});

const MapPage = () => {
    return (
        <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: "100%",
                width: "100%",
            }}
            center={[17.036825, 51.111415]}
        >
            <MapContext.Consumer>
                {(map) => {
                    map.addSource("trees", {
                        type: "geojson",
                        data: "trees.geojson",
                    });

                    map.addLayer(
                        {
                            id: "trees-heat",
                            type: "heatmap",
                            source: "trees",
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
                            id: "trees-point",
                            type: "circle",
                            source: "trees",
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

                    return <div></div>;
                }}
            </MapContext.Consumer>
        </Map>
    );
};

export default MapPage;
