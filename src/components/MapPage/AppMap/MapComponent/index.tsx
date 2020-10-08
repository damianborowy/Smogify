import React from "react";
import ReactMapboxGl, { MapContext } from "react-mapbox-gl";
import HeatmapDataSource from "../../../../models/HeatmapDataSource";
import Location from "../../../../models/Location";
import { useTheme } from "@material-ui/core";
import { MoveEvent } from "..";
import { useDispatch } from "react-redux";
import { updateSelectedStation } from "../../../../store/userData/actions";

const breakpointLayers = ["housenum-label", "road-label"];

const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1IjoidHltb290ZXV1c3oiLCJhIjoiY2tldmw3N3p6MTB1aTJxcDd3ZDIzdnUycyJ9.ZpNCPh7aJsDpg5uzTZIuUQ",
});

const insertColors = (colors: string[]) => {
    return colors.map((color, i) => [i + 1, color]).flat();
};

const aqiColors = [
    "rgb(114, 213, 40)",
    "rgb(240, 223, 15)",
    "rgb(240, 124, 47)",
    "rgb(239, 42, 54)",
    "rgb(185, 0, 92)",
    "rgb(132, 0, 132)",
];

const aqiColorsMap = [
    "match",
    ["get", "dbh"],
    ...insertColors(aqiColors),
    "rgba(0, 0, 0, 0)",
];

const temperatureColors = [
    "rgb(0, 192, 248)",
    "rgb(72, 232, 248)",
    "rgb(128, 248, 248)",
    "rgb(48, 208, 0)",
    "rgb(128, 248, 0)",
    "rgb(200, 248, 80)",
    "rgb(248, 248, 0)",
    "rgb(245, 149, 18)",
    "rgb(245, 115, 18)",
    "rgb(224, 30, 30)",
];

const temperatureColorsMap = [
    "match",
    ["get", "dbh"],
    ...insertColors(temperatureColors),
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
    const theme = useTheme(),
        dispatch = useDispatch();

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
                                            ? temperatureColorsMap
                                            : aqiColorsMap,
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
                                dispatch(
                                    updateSelectedStation(
                                        JSON.parse(
                                            e.features[0].properties
                                                .sensorReading
                                        )
                                    )
                                );
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
