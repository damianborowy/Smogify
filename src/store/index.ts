import { settingsReducer } from "./settings/reducers";
import { combineReducers } from "redux";
import { userDataReducer } from "./userData/reducers";
import { luftdatenReducer } from "./luftdaten/reducers";

export const rootReducer = combineReducers({
    settings: settingsReducer,
    userData: userDataReducer,
    luftdaten: luftdatenReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
