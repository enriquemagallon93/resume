import { type ReactNode, useState } from "react"
import { SettingsContext, type UnitOrCustom, type SettingsContextProps } from "./SettingsContext"
import LeftPanel from "./LeftPanel";
import { A4 } from "../Pages/constants";
import { PageSize } from "../Pages/types";

const getUnitInfo = (unit: string) => {
  if (unit.startsWith('custom-')) {
    return {
      unit: unit.replace('custom-', '') as PageSize['horizontalMargin'],
      isCustom: true
    }
  }
  return {
    unit: unit as PageSize['horizontalMargin'],
    isCustom: false
  }
}

const Settings = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<SettingsContextProps['mode']>('light');
  const [themeName, setThemeName] = useState<SettingsContextProps['themeName']>('default');
  const [width, setWidth] = useState(A4.width);
  const [height, setHeight] = useState(A4.height);
  const [horizontalMargin, setHorizontalMargin] = useState(A4.horizontalMargin);
  const [verticalMargin, setVerticalMargin] = useState(A4.verticalMargin);
  const [isCustomWidth, setIsCustomWidth] = useState(false);
  const [isCustomHeight, setIsCustomHeight] = useState(false);
  const [isCustomHorizontalMargin, setIsCustomHorizontalMargin] = useState(false);
  const [isCustomVerticalMargin, setIsCustomVerticalMargin] = useState(false);

  return (
    <SettingsContext.Provider value={{
      mode,
      setMode,
      themeName,
      setThemeName,
      width,
      setWidth: (width: UnitOrCustom<PageSize['width']>) => {
        const { unit, isCustom } = getUnitInfo(width)
        setIsCustomWidth(isCustom);
        setWidth(unit);
      },
      isCustomWidth,
      height,
      setHeight: (height: UnitOrCustom<PageSize['height']>) => {
        const { unit, isCustom } = getUnitInfo(height)
        setIsCustomHeight(isCustom);
        setHeight(unit);
      },
      isCustomHeight,
      horizontalMargin,
      setHorizontalMargin: (horizontalMargin: UnitOrCustom<PageSize['horizontalMargin']>) => {
        const { unit, isCustom } = getUnitInfo(horizontalMargin)
        setIsCustomHorizontalMargin(isCustom);
        setHorizontalMargin(unit);
      },
      isCustomHorizontalMargin,
      verticalMargin,
      setVerticalMargin: (verticalMargin: UnitOrCustom<PageSize['verticalMargin']>) => {
        const { unit, isCustom } = getUnitInfo(verticalMargin)
        setIsCustomVerticalMargin(isCustom);
        setVerticalMargin(unit);
      },
      isCustomVerticalMargin,
    }} >
      <LeftPanel>
        {children}
      </LeftPanel>
    </SettingsContext.Provider>
  )
}

export default Settings
