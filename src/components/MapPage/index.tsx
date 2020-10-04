import React, { useState } from "react";
import AppDial from "./AppDial";
import AppMap from "./AppMap";
import styles from "./style.module.scss";

const MapPage = () => {
    const [dataType, setDataType] = useState("AQI");

    return (
        <div className={styles.container}>
            <AppMap dataType={dataType} />
            <AppDial dataType={dataType} setDataType={setDataType} />
        </div>
    );
};

export default MapPage;
