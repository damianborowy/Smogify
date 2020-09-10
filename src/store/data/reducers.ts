import { SettingsState, SettingsActionTypes, TOGGLE_THEME } from "./types";

const initialState: SettingsState = {
    darkTheme: true,
};

export function settingsReducer(
    state = initialState,
    action: SettingsActionTypes
): SettingsState {
    switch (action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                darkTheme: !state.darkTheme,
            };
        default:
            return state;
    }
}
