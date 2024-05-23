import { type ReactNode, useState } from "react"
import { SettingsContext, type SettingsContextProps } from "./SettingsContext"
import LeftPanel from "./LeftPanel";

const Settings = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<SettingsContextProps['mode']>('light');
  const [themeName, setThemeName] = useState<SettingsContextProps['themeName']>('default');

  return (
    <SettingsContext.Provider value={{
      mode,
      setMode,
      themeName,
      setThemeName
    }} >
      <LeftPanel>
        {children}
      </LeftPanel>
    </SettingsContext.Provider>
  )
}

export default Settings