import React, { useState } from "react";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    Paper,
    Switch,
    TextField,
    Typography,
    useTheme,
} from "@material-ui/core";
import { toggleTheme } from "../../store/settings/actions";
import withAppBar from "../../utils/withAppBar";
import {
    FetchedData,
    PollutionData,
    PollutionSource,
} from "../../models/Pollution";
import { updateExternalDataSources } from "../../store/userData/actions";
import { fetchPollutionData } from "../../store/pollution/thunks";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
    a11yDark,
    a11yLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Add, Close, Delete } from "@material-ui/icons";
import { updatePollutionData } from "../../store/pollution/actions";
import { Alert, AlertTitle } from "@material-ui/lab";

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
        pollution = useSelector((state: RootState) => state.pollution),
        dispatch = useDispatch(),
        theme = useTheme(),
        [open, setOpen] = useState(false),
        [isFetching, setIsFetching] = useState(false),
        [isWorking, setIsWorking] = useState(false),
        [sourceName, setSourceName] = useState(""),
        [sourceUrl, setSourceUrl] = useState(""),
        [error, setError] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSourceName(event.target.value);

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSourceUrl(event.target.value);

    const handleSourceDelete = (source: PollutionSource) => {};

    const handleSourceToggle = (source: PollutionSource) => {
        const { sources } = userData;

        const sourceIndex = sources.findIndex(
            (src) => src.name === source.name
        );

        sources[sourceIndex].enabled = !sources[sourceIndex].enabled;

        dispatch(updateExternalDataSources(sources));
        dispatch(fetchPollutionData());
    };

    const handleClearClicked = () => {
        setIsFetching(false);
        setIsWorking(false);
        setSourceName("");
        setSourceUrl("");
        setError("");
    };

    const handleTryClicked = async () => {
        setIsFetching(true);

        try {
            const response: FetchedData = await fetch(sourceUrl).then((res) =>
                res.json()
            );
            response.source = sourceName;

            setError("");
            setIsWorking(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsFetching(false);
        }
    };

    const handleAddClicked = async () => {
        const response: FetchedData = await fetch(sourceUrl).then((res) =>
            res.json()
        );
        response.source = sourceName;

        const newData = new PollutionData(response);
        const pollutionData = pollution.pollutionData!;

        pollutionData.mergePollutionData(newData);

        const { sources } = userData;
        sources.push({
            name: sourceName,
            apiUrl: sourceUrl,
            enabled: true,
        });

        dispatch(updatePollutionData(pollutionData));
        dispatch(updateExternalDataSources(sources));
        handleClose();
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
                    <React.Fragment key={source.name}>
                        <FormControlLabel
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
                        {!["Luftdaten", "GIOŚ"].includes(source.name) && (
                            <Delete
                                className={styles.deleteButton}
                                onClick={() => handleSourceDelete(source)}
                            />
                        )}
                    </React.Fragment>
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
                    <div className={styles.textFields}>
                        <TextField
                            className={styles.textField}
                            value={sourceName}
                            onChange={handleNameChange}
                            label="Source name"
                            variant="filled"
                            disabled={isWorking}
                        />
                        <TextField
                            className={styles.textField}
                            value={sourceUrl}
                            onChange={handleUrlChange}
                            label="Source URL"
                            placeholder="Should start with http:// or https://"
                            variant="filled"
                            disabled={isWorking}
                        />
                    </div>
                    {error !== "" && (
                        <Alert severity="error" style={{ marginBottom: 16 }}>
                            <AlertTitle>Error</AlertTitle>
                            {error}
                        </Alert>
                    )}
                    <div className={styles.info}>
                        <Typography>
                            Response should be an object containing one property{" "}
                            <strong>readings</strong> which is an array of
                            values described below:
                        </Typography>
                        <SyntaxHighlighter
                            language="typescript"
                            style={
                                theme.palette.type === "dark"
                                    ? a11yDark
                                    : a11yLight
                            }
                            customStyle={{
                                backgroundColor: "unset",
                            }}
                        >
                            {dataFormatString}
                        </SyntaxHighlighter>
                        <Typography>
                            Where <strong>lat</strong> and <strong>lng</strong>{" "}
                            stand for geographical latitude and longitude,{" "}
                            <strong>pm25</strong> and <strong>pm10</strong> are
                            optional values of pollution given in μg/m³, and{" "}
                            <strong>temperature</strong> is an optional value
                            given in °C
                        </Typography>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="default" onClick={handleClearClicked}>
                        Clear
                    </Button>
                    <Button
                        color="default"
                        disabled={isFetching || isWorking}
                        onClick={handleTryClicked}
                    >
                        {isFetching && (
                            <CircularProgress
                                className={styles.progress}
                                size={16}
                            />
                        )}
                        Try
                    </Button>
                    <Button
                        color="primary"
                        disabled={!isWorking}
                        onClick={handleAddClicked}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default withAppBar(SettingsPage);
