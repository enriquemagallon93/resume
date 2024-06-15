import { dark } from './darkPalette'
import { dracula, darkDracula } from './dracula';

import {type Theme } from '@stylexjs/stylex'

export const themes = {
  default: null,
  dracula
} as const satisfies Record<string, null | Theme<any>>;

export const darkThemes = {
  default: dark,
  dracula: darkDracula
} as const satisfies Record<string, null | Theme<any>>;

export type Themes = typeof themes;
export type ThemeName = keyof Themes;
