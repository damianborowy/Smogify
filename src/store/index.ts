import { settingsReducer } from "./settings/reducers";
import { combineReducers } from "redux";
import { locationReducer } from "./location/reducers";
import { luftdatenReducer } from "./luftdaten/reducers";

export const rootReducer = combineReducers({
    settings: settingsReducer,
    location: locationReducer,
    luftdaten: luftdatenReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
