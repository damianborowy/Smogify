import React, { useEffect, useMemo, useRef, useState } from "react";
import HeatmapDataSource from "../../../models/HeatmapDataSource";
import Feature from "../../../models/Feature";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Location from "../../../models/Location";
import MapComponent from "./MapComponent";

export type MoveEvent = {
    target: {
        transform: {
            _center: {
                lat: number;
                lng: number;
            };
        };
    };
};

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
        [selectedStation, setSelectedStation] = useState(),
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
                                dbh = data.aqi25 ?? 0;
                                break;
                            case "PM10":
                                dbh = data.aqi10 ?? 0;
                                break;
                            case "Temperature":
                                dbh = data.temperature ?? 0;
                                break;
                            case "AQI":
                                dbh = data.aqi ?? 0;
                                break;
                        }

                        return new Feature(dbh, data);
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
                dataType={dataType}
            />
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dataSource]
    );

    return <>{MemoizedMap}</>;
};

export default AppMap;
