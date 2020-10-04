import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import {
    Cloud,
    WbSunny,
    CloudQueue,
    BarChart,
    ArrowDropUp,
} from "@material-ui/icons";
import styles from "./style.module.scss";

const dataTypes = [
    { icon: <WbSunny />, name: "Temperature" },
    { icon: <Cloud />, name: "PM10" },
    { icon: <CloudQueue />, name: "PM2.5" },
    { icon: <BarChart />, name: "AQI" },
];

interface AppDialProps {
    dataType: string;
    setDataType: React.Dispatch<React.SetStateAction<string>>;
}

const AppDial = ({ dataType, setDataType }: AppDialProps) => {
    const [isDialOpen, setIsDialOpen] = useState(false);

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
        <SpeedDial
            className={styles.speedDial}
            onClose={handleDialClose}
            onOpen={handleDialOpen}
            icon={selectSpeedDialIcon()}
            open={isDialOpen}
            ariaLabel="Floating action button"
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
    );
};

export default AppDial;
