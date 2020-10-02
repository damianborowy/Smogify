import { Fab, Zoom } from "@material-ui/core";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import React, { useState } from "react";
import AppMap from "./AppMap";

const MapPage = () => {
    const [dataType, setDataType] = useState("PM2.5");

    return (
        <div>
            <AppMap dataType={dataType} />

            <Zoom in={true}>
                <SpeedDial open={false} ariaLabel="foo">
                    <SpeedDialAction />
                </SpeedDial>
            </Zoom>
        </div>
    );
};

export default MapPage;
