import React, { useState } from "react";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    Paper,
    Switch,
    Typography,
    useTheme,
} from "@material-ui/core";
import { toggleTheme } from "../../store/settings/actions";
import withAppBar from "../../utils/withAppBar";
import { PollutionSource } from "../../models/Pollution";
import { updateExternalDataSources } from "../../store/userData/actions";
import { fetchPollutionData } from "../../store/pollution/thunks";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
    a11yDark,
    a11yLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Add, Close } from "@material-ui/icons";

const dataFormatString = `{
    readings: {
        lat: number;
        lng: number;
        pm25?: number;
        pm10?: number;
        temperature?: number;
    }[];
}`;

const SettingsPage = () => {
    const settings = useSelector((state: RootState) => state.settings),
        userData = useSelector((state: RootState) => state.userData),
        dispatch = useDispatch(),
        theme = useTheme(),
        [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSourceToggle = (source: PollutionSource) => {
        const { sources } = userData;

        const sourceIndex = sources.findIndex(
            (src) => src.name === source.name
        );

        sources[sourceIndex].enabled = !sources[sourceIndex].enabled;

        dispatch(updateExternalDataSources(sources));
        dispatch(fetchPollutionData());
    };

    return (
        <Paper className={styles.container} elevation={0} square>
            <Typography>General</Typography>
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
            <Typography>Data sources</Typography>
            <Paper className={styles.paper} elevation={2}>
                {userData.sources.map((source, i) => (
                    <FormControlLabel
                        key={source.name}
                        className={styles.switch}
                        label={source.name}
                        labelPlacement="start"
                        control={
                            <Switch
                                checked={source.enabled}
                                color="primary"
                                onChange={() => handleSourceToggle(source)}
                            />
                        }
                    />
                ))}
                <Box className={styles.addSource} onClick={handleOpen}>
                    <Add className={styles.addIcon} />
                    <Typography>Add new source</Typography>
                </Box>
            </Paper>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Add source
                    <IconButton
                        className={styles.closeButton}
                        onClick={handleClose}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <SyntaxHighlighter
                        language="typescript"
                        style={
                            theme.palette.type === "dark" ? a11yDark : a11yLight
                        }
                        customStyle={
                            theme.palette.type === "dark"
                                ? { backgroundColor: "unset" }
                                : {}
                        }
                    >
                        {dataFormatString}
                    </SyntaxHighlighter>
                </DialogContent>
            </Dialog>
        </Paper>
    );
};

export default withAppBar(SettingsPage);
