import { Button, Paper } from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearSelectedStation } from "../../../store/userData/actions";
import styles from "./style.module.scss";

const StationView = () => {
    const userData = useSelector((state: RootState) => state.userData),
        [expanded, setExpanded] = useState(false),
        dispatch = useDispatch();

    return (
        <div
            className={clsx(styles.base, {
                [styles.open]: userData.selectedStation,
                [styles.closed]: !userData.selectedStation,
                [styles.expanded]: expanded,
            })}
        >
            <div>
                <Button onClick={() => setExpanded(!expanded)}>Foo</Button>
                <Button
                    onClick={() => {
                        dispatch(clearSelectedStation());
                        setExpanded(false);
                    }}
                >
                    Hide
                </Button>
            </div>
        </div>
    );
};

export default StationView;
