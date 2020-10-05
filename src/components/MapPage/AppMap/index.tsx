import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMapboxGl, { MapContext } from "react-mapbox-gl";
import HeatmapDataSource from "../../../models/HeatmapDataSource";
import Feature from "../../../models/Feature";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Location from "../../../models/Location";
import _ from "lodash";
import { useTheme } from "@material-ui/core";

const breakpointLayers = ["housenum-label", "road-label"];

type MoveEvent = {
    target: {
        transform: {
            _center: {
                lat: number;
                lng: number;
            };
        };
    };
};

const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1IjoidHltb290ZXV1c3oiLCJhIjoiY2tldmw3N3p6MTB1aTJxcDd3ZDIzdnUycyJ9.ZpNCPh7aJsDpg5uzTZIuUQ",
});

// ? try using just one layer of circles and color them with a proper gradient

interface AppMapProps {
    dataType: string;
}

const AppMap = ({ dataType }: AppMapProps) => {
    const locationData = useSelector((state: RootState) => state.location),
        luftdatenData = useSelector((state: RootState) => state.luftdaten),
        [dataSource, setDataSource] = useState<HeatmapDataSource | null>(null),
        [location, setLocation] = useState(
            new Location(locationData.location.lat, locationData.location.lng)
        ),
        counter = useRef(0);

    const onMoveCallback = (e: MoveEvent) => {
        const { lat, lng } = e.target.transform._center;

        setLocation(new Location(lat, lng));
    };

    useEffect(() => {
        if (luftdatenData.pollutionData) {
            setDataSource(
                new HeatmapDataSource(
                    luftdatenData.pollutionData?.sensorReadings.map((data) => {
                        let dbh = 0;

                        switch (dataType) {
                            case "PM2.5":
                                dbh = data.pm25 ?? 0;
                                break;
                            case "PM10":
                                dbh = data.pm10 ?? 0;
                                break;
                            case "Temperature":
                                dbh = data.temperature ?? 0;
                                break;
                            case "AQI":
                                dbh = data.aqi ?? 0;
                                break;
                        }

                        return new Feature(
                            dbh,
                            data.location.lng,
                            data.location.lat
                        );
                    })
                )
            );
        }
    }, [dataType, luftdatenData]);

    const MemoizedMap = useMemo(
        () => (
            <MapComponent
                dataSource={dataSource}
                onMoveCallback={onMoveCallback}
                location={location}
                counter={counter}
            />
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dataSource]
    );

    return <>{MemoizedMap}</>;
};

interface MapComponentProps {
    dataSource: HeatmapDataSource | null;
    onMoveCallback: (e: MoveEvent) => void;
    location: Location;
    counter: React.MutableRefObject<number>;
}

const MapComponent = ({
    dataSource,
    onMoveCallback,
    location,
    counter,
}: MapComponentProps) => {
    const theme = useTheme();

    return (
        <Map
            // eslint-disable-next-line react/style-prop-object
            style={
                theme.palette.type === "dark"
                    ? "mapbox://styles/tymooteuusz/ckfwt9ldm4w8w1apkqpo6q8fw"
                    : "mapbox://styles/mapbox/streets-v9"
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
                            map.removeLayer(
                                "data-point" + (counter.current - 1)
                            );
                            map.removeSource("data" + (counter.current - 1));
                        } else {
                            map.on("move", onMoveCallback);
                        }

                        const layers = map.getStyle().layers;
                        let firstSymbolId;

                        console.log(
                            layers.filter(
                                (layer: any) => layer.type === "symbol"
                            )
                        );

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
                                    // Size circle radius by earthquake magnitude and zoom level
                                    "circle-radius": {
                                        stops: [
                                            [0, 1],
                                            [12, 10],
                                            [20, 15],
                                        ],
                                    },
                                    "circle-color": {
                                        property: "dbh",
                                        type: "exponential",
                                        stops: [
                                            [0, "rgba(0, 153, 102, 0.5)"],
                                            [13.1, "rgba(255, 222, 51, 0.5)"],
                                            [55.1, "rgba(255, 153, 51, 0.5)"],
                                            [75.1, "rgba(204, 0, 51, 0.5)"],
                                            [110.1, "rgba(102, 0, 153, 0.5)"],
                                            [200, "rgba(126, 0, 35, 0.5)"],
                                        ],
                                    },
                                    "circle-stroke-color": "white",
                                    "circle-stroke-width": 0,
                                    "circle-opacity": {
                                        stops: [
                                            [12, 1],
                                            [13, 0],
                                        ],
                                    },
                                },
                            },
                            firstSymbolId
                        );

                        map.addLayer(
                            {
                                id: "data-point" + counter.current,
                                type: "circle",
                                source: "data" + counter.current,
                                minzoom: 0,
                                paint: {
                                    "circle-radius": 10,
                                    "circle-color": {
                                        property: "dbh",
                                        type: "exponential",
                                        stops: [
                                            [0, "rgb(0, 153, 102)"],
                                            [13.1, "rgb(255, 222, 51)"],
                                            [55.1, "rgb(255, 153, 51)"],
                                            [75.1, "rgb(204, 0, 51)"],
                                            [110.1, "rgb(102, 0, 153)"],
                                            [200, "rgb(126, 0, 35)"],
                                        ],
                                    },
                                    "circle-stroke-color": "white",
                                    "circle-stroke-width": 0,
                                    "circle-opacity": {
                                        stops: [
                                            [12, 0],
                                            [13, 1],
                                        ],
                                    },
                                },
                            },
                            firstSymbolId
                        );

                        counter.current++;

                        return <></>;
                    }
                }}
            </MapContext.Consumer>
        </Map>
    );
};

export default AppMap;
