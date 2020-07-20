export const TOGGLE_THEME = "TOGGLE_THEME";

export interface SettingsState {
    darkTheme: boolean;
}

interface ToggleTheme {
    type: typeof TOGGLE_THEME;
    payload: any;
}

export type SettingsActionTypes = ToggleTheme;
