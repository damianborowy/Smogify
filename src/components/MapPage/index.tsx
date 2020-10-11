import React, { useState } from "react";
import AppDial from "./AppDial";
import AppMap from "./AppMap";
import ColorsMeter from "../Shared/ColorsMeter";
import StationView from "./StationView";
import styles from "./style.module.scss";

const MapPage = () => {
    const [dataType, setDataType] = useState("AQI");

    return (
        <div className={styles.container}>
            <AppMap dataType={dataType} />
            <AppDial dataType={dataType} setDataType={setDataType} />
            <div className={styles.colorMeter}>
                <div className={styles.colorMeterPositioner}>
                    <ColorsMeter dataType={dataType} bgColor="default" />
                </div>
            </div>
            <div className={styles.stationView}>
                <StationView />
            </div>
        </div>
    );
};

export default MapPage;
