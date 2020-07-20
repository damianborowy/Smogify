import { settingsReducer } from "./settings/reducers";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
