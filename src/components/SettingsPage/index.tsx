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
        <div className={styles.container}>
            <h1>Settings</h1>
            <div>
                <div>{settings.darkTheme ? "Dark theme" : "Light theme"}</div>
                <Paper>
                    <Button
                        color="primary"
                        onClick={() => dispatch(toggleTheme())}
                    >
                        Toggle mode
                    </Button>
                </Paper>
            </div>
        </div>
    );
};

export default SettingsPage;
