import { TOGGLE_THEME, SettingsActionTypes } from "./types";

export function toggleTheme(): SettingsActionTypes {
    return {
        type: TOGGLE_THEME,
        payload: "",
    };
}
