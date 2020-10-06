import React from "react";
import ReactMapboxGl, { MapContext } from "react-mapbox-gl";
import HeatmapDataSource from "../../../../models/HeatmapDataSource";
import Location from "../../../../models/Location";
import { useTheme } from "@material-ui/core";
import { MoveEvent } from "..";

const breakpointLayers = ["housenum-label", "road-label"];

const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1IjoidHltb290ZXV1c3oiLCJhIjoiY2tldmw3N3p6MTB1aTJxcDd3ZDIzdnUycyJ9.ZpNCPh7aJsDpg5uzTZIuUQ",
});

const aqiColors = [
    "match",
    ["get", "dbh"],
    1,
    "rgb(114, 213, 40)",
    2,
    "rgb(240, 223, 15)",
    3,
    "rgb(240, 124, 47)",
    4,
    "rgb(239, 42, 54)",
    5,
    "rgb(185, 0, 92)",
    6,
    "rgb(132, 0, 132)",
    "rgba(0, 0, 0, 0)",
];

const temperatureColors = [
    "match",
    ["get", "dbh"],
    1,
    "rgb(114, 213, 40)",
    2,
    "rgb(240, 223, 15)",
    3,
    "rgb(240, 124, 47)",
    4,
    "rgb(239, 42, 54)",
    5,
    "rgb(185, 0, 92)",
    6,
    "rgb(132, 0, 132)",
    "rgba(0, 0, 0, 0)",
];

interface MapComponentProps {
    dataSource: HeatmapDataSource | null;
    onMoveCallback: (e: MoveEvent) => void;
    location: Location;
    counter: React.MutableRefObject<number>;
    dataType: string;
}

const MapComponent = ({
    dataSource,
    onMoveCallback,
    location,
    counter,
    dataType,
}: MapComponentProps) => {
    const theme = useTheme();

    return (
        <Map
            // eslint-disable-next-line react/style-prop-object
            style={
                theme.palette.type === "dark"
                    ? "mapbox://styles/tymooteuusz/ckfwt9ldm4w8w1apkqpo6q8fw"
                    : "mapbox://styles/tymooteuusz/ckfwt8uny0b1z19s2clb6a5uz"
            }
            containerStyle={{
                height: "100%",
                width: "100%",
            }}
            center={[location.lng, location.lat]}
        >
            <MapContext.Consumer>
                {(map) => {
                    if (dataSource) {
                        if (counter.current > 0) {
                            map.removeLayer(
                                "data-circle" + (counter.current - 1)
                            );
                            map.removeSource("data" + (counter.current - 1));
                        } else {
                            map.on("move", onMoveCallback);
                        }

                        const layers = map.getStyle().layers;
                        let firstSymbolId;

                        for (let i = 0; i < layers.length; i++) {
                            if (breakpointLayers.includes(layers[i].id)) {
                                firstSymbolId = layers[i].id;
                                break;
                            }
                        }

                        map.addSource("data" + counter.current, {
                            type: "geojson",
                            data: dataSource,
                        });

                        map.addLayer(
                            {
                                id: "data-circle" + counter.current,
                                type: "circle",
                                source: "data" + counter.current,
                                minzoom: 0,
                                paint: {
                                    "circle-radius": {
                                        stops: [
                                            [0, 1],
                                            [8, 5],
                                            [14, 15],
                                        ],
                                    },
                                    "circle-color":
                                        dataType === "Temperature"
                                            ? temperatureColors
                                            : aqiColors,
                                    "circle-opacity": {
                                        stops: [
                                            [0, 0.5],
                                            [8, 0.7],
                                            [14, 1],
                                        ],
                                    },
                                },
                            },
                            firstSymbolId
                        );

                        map.on(
                            "click",
                            "data-circle" + counter.current,
                            function (e: any) {
                                // console.log(e.features[0].properties.dbh);
                                console.log(e.features);
                            }
                        );

                        counter.current++;

                        return <></>;
                    }
                }}
            </MapContext.Consumer>
        </Map>
    );
};

export default MapComponent;
