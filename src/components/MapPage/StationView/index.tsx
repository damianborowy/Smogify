import { Button, IconButton, Paper } from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearSelectedStation } from "../../../store/userData/actions";
import styles from "./style.module.scss";
import { Close, ExpandLess, ExpandMore } from "@material-ui/icons";
import ColorsMeter from "../ColorsMeter";

interface StationViewProps {
    dataType: string;
}

const StationView = ({ dataType }: StationViewProps) => {
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
            <Paper className={styles.container} elevation={0} square>
                {userData.selectedStation && (
                    <>
                        <div className={styles.header}>
                            <IconButton onClick={() => setExpanded(!expanded)}>
                                {expanded ? <ExpandMore /> : <ExpandLess />}
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    dispatch(clearSelectedStation());
                                    setExpanded(false);
                                }}
                            >
                                <Close />
                            </IconButton>
                        </div>
                        <div className={styles.readings}>
                            <ColorsMeter dataType={dataType} bgColor="none" />
                        </div>
                        <div className={styles.body}>
                            {expanded && (
                                <>
                                    <div>
                                        <Button
                                            onClick={() =>
                                                setExpanded(!expanded)
                                            }
                                        >
                                            Foo
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                dispatch(
                                                    clearSelectedStation()
                                                );
                                                setExpanded(false);
                                            }}
                                        >
                                            Hide
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setExpanded(!expanded)
                                            }
                                        >
                                            Foo
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                dispatch(
                                                    clearSelectedStation()
                                                );
                                                setExpanded(false);
                                            }}
                                        >
                                            Hide
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setExpanded(!expanded)
                                            }
                                        >
                                            Foo
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                dispatch(
                                                    clearSelectedStation()
                                                );
                                                setExpanded(false);
                                            }}
                                        >
                                            Hide
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setExpanded(!expanded)
                                            }
                                        >
                                            Foo
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                dispatch(
                                                    clearSelectedStation()
                                                );
                                                setExpanded(false);
                                            }}
                                        >
                                            Hide
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setExpanded(!expanded)
                                            }
                                        >
                                            Foo
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                dispatch(
                                                    clearSelectedStation()
                                                );
                                                setExpanded(false);
                                            }}
                                        >
                                            Hide
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </Paper>
        </div>
    );
};

export default StationView;
