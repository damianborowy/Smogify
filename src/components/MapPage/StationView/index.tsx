import {
    Button,
    IconButton,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearSelectedStation } from "../../../store/userData/actions";
import styles from "./style.module.scss";
import { Close, ExpandLess, ExpandMore } from "@material-ui/icons";
import ColorsMeter from "../../Shared/ColorsMeter";

interface StationViewProps {
    dataType: string;
}

const StationView = ({ dataType }: StationViewProps) => {
    const userData = useSelector((state: RootState) => state.userData),
        [expanded, setExpanded] = useState(false),
        dispatch = useDispatch(),
        theme = useTheme(),
        matches = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <div
            className={clsx(styles.base, {
                [styles.open]: userData.selectedStation,
                [styles.closed]: !userData.selectedStation,
                [styles.expandedSmall]: expanded && !matches,
                [styles.expanded]: expanded && matches,
                [styles.borderRadius]: !expanded || (expanded && matches),
            })}
        >
            <Paper
                className={clsx(styles.container, {
                    [styles.borderRadius]: !expanded || (expanded && matches),
                })}
                elevation={0}
                square
            >
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
                            <div className={styles.reading}>
                                <Typography className={styles.readingText}>
                                    PM 2.5
                                </Typography>
                                <ColorsMeter
                                    reading={userData.selectedStation}
                                    dataType="PM2.5"
                                    bgColor="none"
                                />
                            </div>
                            <div className={styles.reading}>
                                <Typography className={styles.readingText}>
                                    PM 10
                                </Typography>
                                <ColorsMeter
                                    reading={userData.selectedStation}
                                    dataType="PM10"
                                    bgColor="none"
                                />
                            </div>
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
