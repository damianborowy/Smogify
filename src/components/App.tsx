import React, { useEffect } from "react";
import styles from "./App.module.scss";
import { Route, BrowserRouter } from "react-router-dom";
import BottomNavBar from "./BottomNavBar";
import HomePage from "../pages/HomePage";
import MapPage from "../pages/MapPage";
import SettingsPage from "../pages/SettingsPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { updateLocationThunk } from "../store/location/thunks";
import { fetchPollutionData } from "../store/luftdaten/thunks";

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
    },
});

const App = () => {
    const settings = useSelector((state: RootState) => state.settings),
        theme = settings.darkTheme ? darkTheme : lightTheme,
        dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateLocationThunk());
        dispatch(fetchPollutionData());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <div className={styles.wrapper}>
                    <div className={styles.page}>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/map" component={MapPage} />
                        <Route path="/settings" component={SettingsPage} />
                    </div>
                    <BottomNavBar />
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
