import React from "react";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { FormControlLabel, Paper, Switch } from "@material-ui/core";
import { toggleTheme } from "../../store/settings/actions";
import withAppBar from "../../utils/withAppBar";

const SettingsPage = () => {
    const settings = useSelector((state: RootState) => state.settings),
        dispatch = useDispatch();

    return (
        <Paper className={styles.container} elevation={0} square>
            <Paper className={styles.paper} elevation={2}>
                <FormControlLabel
                    className={styles.switch}
                    label="Dark mode"
                    labelPlacement="start"
                    control={
                        <Switch
                            checked={settings.darkTheme}
                            color="primary"
                            onChange={() => dispatch(toggleTheme())}
                        />
                    }
                />
            </Paper>
        </Paper>
    );
};

export default withAppBar(SettingsPage);
