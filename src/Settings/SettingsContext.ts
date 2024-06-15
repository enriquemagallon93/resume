import { createContext } from "react";
import { type ThemeName } from "../themes/themes";
import { type PageSize } from "../Pages/types";
import { A4 } from "../Pages/constants";

export type UnitOrCustom<Unit extends string | number | undefined> = `${'custom--' | ''}${NonNullable<Unit>}`

type PageSizeSettings = NonNullable<PageSize> & {
    setWidth: (width: UnitOrCustom<PageSize['width']>) => void,
    isCustomWidth: boolean;
    setHeight: (height: UnitOrCustom<PageSize['height']>) => void,
    isCustomHeight: boolean;
    setHorizontalMargin: (horizontalMargin: UnitOrCustom<PageSize['horizontalMargin']>) => void,
    isCustomHorizontalMargin: boolean;
    setVerticalMargin: (verticalMargin: UnitOrCustom<PageSize['verticalMargin']>) => void,
    isCustomVerticalMargin: boolean;
}

export type SettingsContextProps = {
    mode: 'light' | 'dark';
    setMode: (mode: 'light' | 'dark') => void;
    themeName: ThemeName;
    setThemeName: (theme: ThemeName) => void;
    width: NonNullable<PageSize>['width'],
} & PageSizeSettings

export const SettingsContext = createContext<SettingsContextProps>({
  mode: 'light',
  setMode: () => {},
  themeName: 'default',
  setThemeName: () => {},
  width: A4.width,
  setWidth: () => {},
  isCustomWidth: false,
  height: A4.height,
  setHeight: () => {},
  isCustomHeight: false,
  horizontalMargin: A4.horizontalMargin,
  setHorizontalMargin: () => {},
  isCustomHorizontalMargin: false,
  verticalMargin: A4.verticalMargin,
  setVerticalMargin: () => {},
  isCustomVerticalMargin: false,
})