import React from "react";
import styles from "./style.module.scss";

interface PollutionChartsProps {
    stationId: number;
}

const PollutionCharts = ({ stationId }: PollutionChartsProps) => {
    return (
        <div>
            <div>{stationId}</div>
        </div>
    );
};

export default PollutionCharts;
