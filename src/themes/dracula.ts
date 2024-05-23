import * as stylex from '@stylexjs/stylex';

import { colors } from './palette.stylex';

export const dracula = stylex.createTheme(colors, {
    primaryBackground: "#44475A",
    hightlight: "#50fa7b"
})

export const darkDracula = stylex.createTheme(colors, {
    primaryBackground:  "#282a36",
    hightlight: "#50fa7b"
})

