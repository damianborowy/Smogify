import React from "react";
import { Provider } from "react-redux";
import { rootReducer } from "../store/";
import { createStore } from "redux";
import Test from "./Test";

const store = createStore(rootReducer);

const App = () => {
    return (
        <Provider store={store}>
            <Test />
        </Provider>
    );
};

export default App;
