import React from "react";
import styles from "./App.module.scss";
import { Provider } from "react-redux";
import { rootReducer } from "../store/";
import { createStore } from "redux";
import { HashRouter, Route } from "react-router-dom";
import BottomNavBar from "./BottomNavBar";
import HomePage from "../pages/HomePage";
import MapPage from "../pages/MapPage";
import SettingsPage from "../pages/SettingsPage";

const store = createStore(rootReducer);

const App = () => {
    return (
        <Provider store={store}>
            <div className={styles.wrapper}>
                <div className={styles.page}>
                    <HashRouter>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/map" component={MapPage} />
                        <Route path="/settings" component={SettingsPage} />
                    </HashRouter>
                </div>
                <BottomNavBar />
            </div>
        </Provider>
    );
};

export default App;
