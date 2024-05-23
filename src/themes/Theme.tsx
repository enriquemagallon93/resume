import * as stylex from '@stylexjs/stylex';
import { ReactNode } from 'react';
import { themes, darkThemes } from './themes';
import useSettings from '../Settings/useSettings';

const Theme = ({ children }: { children: ReactNode }) => {
    const { mode, themeName } = useSettings();

  return (
    <div {...stylex.props(mode === 'light' ? themes[themeName] : darkThemes[themeName])} >{children}</div>
  )
}

export default Theme