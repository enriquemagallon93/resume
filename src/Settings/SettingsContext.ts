import { createContext } from "react";
import { type ThemeName } from "../themes/themes";

export type SettingsContextProps = {
    mode: 'light' | 'dark';
    setMode: (mode: 'light' | 'dark') => void;
    themeName: ThemeName;
    setThemeName: (theme: ThemeName) => void;
}

export const SettingsContext = createContext<SettingsContextProps>({
    mode: 'light',
    setMode: () => {},
    themeName: 'default',
    setThemeName: () => {}
})