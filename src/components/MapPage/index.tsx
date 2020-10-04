import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import {
    BarChart,
    WbSunny,
    Cloud,
    CloudQueue,
    ArrowDropUp,
} from "@material-ui/icons";
import React, { useState } from "react";
import AppMap from "./AppMap";
import styles from "./style.module.scss";

const dataTypes = [
    { icon: <WbSunny />, name: "Temperature" },
    { icon: <Cloud />, name: "PM10" },
    { icon: <CloudQueue />, name: "PM2.5" },
    { icon: <BarChart />, name: "AQI" },
];

const MapPage = () => {
    const [dataType, setDataType] = useState("AQI"),
        [isDialOpen, setIsDialOpen] = useState(false);

    const handleDialOpen = () => setIsDialOpen(true);
    const handleDialClose = () => setIsDialOpen(false);

    const handleActionClick = (newDataType: string) => {
        setDataType(newDataType);
        handleDialClose();
    };

    const selectSpeedDialIcon = (): JSX.Element => {
        const selectedDataType = dataTypes.find(
            (type) => type.name === dataType
        );

        return selectedDataType ? selectedDataType.icon : <ArrowDropUp />;
    };

    return (
        <div className={styles.container}>
            <AppMap dataType={dataType} />
            <SpeedDial
                className={styles.speedDial}
                onClose={handleDialClose}
                onOpen={handleDialOpen}
                icon={selectSpeedDialIcon()}
                open={isDialOpen}
                ariaLabel="foo"
            >
                {dataTypes.map((type) => (
                    <SpeedDialAction
                        key={type.name}
                        icon={type.icon}
                        tooltipTitle={type.name}
                        tooltipOpen
                        onClick={() => handleActionClick(type.name)}
                    />
                ))}
            </SpeedDial>
        </div>
    );
};

export default MapPage;
