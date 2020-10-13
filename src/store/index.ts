import { settingsReducer } from "./settings/reducers";
import { Action, CombinedState, combineReducers } from "redux";
import { userDataReducer } from "./userData/reducers";
import { pollutionReducer } from "./pollution/reducers";
import { weatherReducer } from "./weather/reducers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { SettingsState } from "./settings/types";
import { LuftdatenState } from "./pollution/types";
import { UserDataState } from "./userData/types";
import { WeatherState } from "./weather/types";

export type DispatchType = ThunkDispatch<
    CombinedState<{
        settings: SettingsState;
        userData: UserDataState;
        luftdaten: LuftdatenState;
        weather: WeatherState;
    }>,
    unknown,
    Action<string>
>;

export type ThunkType = ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    Action<string>
>;

export const rootReducer = combineReducers({
    settings: settingsReducer,
    userData: userDataReducer,
    pollution: pollutionReducer,
    weather: weatherReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
