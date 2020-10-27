import { Dialog, DialogTitle } from "@material-ui/core";
import React from "react";
import styles from "./style.module.scss";

interface PollutionChartsProps {
    stationId: number;
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
            <DialogTitle>Pollution over time</DialogTitle>
            <div></div>
        </Dialog>
    );
};

export default PollutionCharts;
