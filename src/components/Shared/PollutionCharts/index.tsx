import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import styles from "./style.module.scss";

interface PollutionChartsProps {
    stationId?: number;
    open: boolean;
    handleClose: () => void;
}

const PollutionCharts = ({
    stationId,
    open,
    handleClose,
}: PollutionChartsProps) => {
    return (
        <Dialog open={open} maxWidth="md" onClose={handleClose} fullWidth>
            <DialogTitle>
                Pollution over time
                <IconButton
                    className={styles.closeButton}
                    onClick={handleClose}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            {stationId?.toString() ? (
                <DialogContent className={styles.charts}>
                    <iframe
                        className={styles.chart}
                        src={`https://maps.sensor.community/grafana/d-solo/000000004/single-sensor-view?orgId=1&panelId=2&var-node=${
                            stationId - 1
                        }`}
                        width={280}
                        height={300}
                        title="Last 24h"
                    />
                    <iframe
                        className={styles.chart}
                        src={`https://maps.sensor.community/grafana/d-solo/000000004/single-sensor-view?orgId=1&panelId=1&var-node=${
                            stationId - 1
                        }`}
                        width={280}
                        height={300}
                        title="Moving average"
                    />
                </DialogContent>
            ) : (
                <DialogContent>
                    Data of pollution over time is available only for Luftdaten
                    stations.
                </DialogContent>
            )}
        </Dialog>
    );
};

export default PollutionCharts;
