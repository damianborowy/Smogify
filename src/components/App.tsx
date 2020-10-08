import React, { useEffect } from "react";
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
    useTheme,
    useMediaQuery,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { updateLocationThunk } from "../store/userData/thunks";
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
        theme = useTheme(),
        isSmall = useMediaQuery(theme.breakpoints.up("md")),
        appTheme = settings.darkTheme ? darkTheme : lightTheme,
        dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateLocationThunk());
        dispatch(fetchPollutionData());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <ThemeProvider theme={appTheme}>
                <div
                    className={
                        isSmall ? styles.wrapperDrawer : styles.wrapperNavBar
                    }
                >
                    <div className={styles.page}>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/map" component={MapPage} />
                        <Route path="/settings" component={SettingsPage} />
                    </div>
                    <Navigation drawerMode={isSmall} />
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
