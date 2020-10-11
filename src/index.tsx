import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "./store/";
import { throttle } from "lodash";
import { saveState, loadState } from "./utils/localStorage";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const persistedState = loadState();
const middlewares = [thunk];
const composedEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

export const store = createStore(
    rootReducer,
    persistedState,
    composedEnhancers
);

store.subscribe(
    throttle(() => {
        saveState({
            luftdaten: store.getState().luftdaten,
            userData: store.getState().userData,
            settings: store.getState().settings,
            weather: store.getState().weather,
        });
    }, 1000)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
