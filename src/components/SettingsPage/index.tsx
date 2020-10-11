import React from "react";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Button, Paper } from "@material-ui/core";
import { toggleTheme } from "../../store/settings/actions";

const SettingsPage = () => {
    const settings = useSelector((state: RootState) => state.settings),
        dispatch = useDispatch();

    return (
        <Paper className={styles.container} elevation={0} square>
            <div>
                <div>{settings.darkTheme ? "Dark theme" : "Light theme"}</div>
                <Paper elevation={2}>
                    <Button
                        color="primary"
                        onClick={() => dispatch(toggleTheme())}
                    >
                        Toggle mode
                    </Button>
                </Paper>
            </div>
        </Paper>
    );
};

export default SettingsPage;
