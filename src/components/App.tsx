import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { Route, BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import HomePage from "./HomePage";
import MapPage from "./MapPage";
import SettingsPage from "./SettingsPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
    ThemeProvider,
    createMuiTheme,
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { updateLocationThunk } from "../store/userData/thunks";
import { fetchPollutionData } from "../store/pollution/thunks";
import { clearSelectedStation } from "../store/userData/actions";
import { fetchWeatherData } from "../store/weather/thunks";

const darkTheme = createMuiTheme({
    palette: {
        primary: blue,
        background: {
            paper: "#212121",
        },
        type: "dark",
    },
});

const lightTheme = createMuiTheme({
    palette: {
        primary: blue,
        type: "light",
        background: {
            default: "#fff",
        },
    },
});

const App = () => {
    const settings = useSelector((state: RootState) => state.settings),
        pollution = useSelector((state: RootState) => state.pollution),
        appTheme = settings.darkTheme ? darkTheme : lightTheme,
        dispatch = useDispatch(),
        [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(clearSelectedStation());
        dispatch(updateLocationThunk());
        dispatch(fetchPollutionData());
        dispatch(fetchWeatherData());
    }, [dispatch]);

    useEffect(() => {
        setOpen(pollution.isFetching);
    }, [pollution.isFetching]);

    return (
        <BrowserRouter>
            <ThemeProvider theme={appTheme}>
                <div className={styles.wrapperNavBar}>
                    <div className={styles.page}>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/map" component={MapPage} />
                        <Route path="/settings" component={SettingsPage} />
                    </div>
                    <Navigation />
                </div>
                <Backdrop open={open} style={{ zIndex: 999 }}>
                    <CircularProgress />
                </Backdrop>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
