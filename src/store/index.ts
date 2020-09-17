import { settingsReducer } from "./settings/reducers";
import { combineReducers } from "redux";
import { locationReducer } from "./location/reducers";

export const rootReducer = combineReducers({
    settings: settingsReducer,
    locationData: locationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
