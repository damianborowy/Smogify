import { settingsReducer } from "./settings/reducers";
import { combineReducers } from "redux";
import { userDataReducer } from "./userData/reducers";
import { luftdatenReducer } from "./luftdaten/reducers";
import { weatherReducer } from "./weather/reducers";

export const rootReducer = combineReducers({
    settings: settingsReducer,
    userData: userDataReducer,
    luftdaten: luftdatenReducer,
    weather: weatherReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
