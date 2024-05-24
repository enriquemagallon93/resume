import * as stylex from '@stylexjs/stylex';

import { colors } from './palette.stylex';

export const dark = stylex.createTheme(colors, {
    primaryBackground: "#2b2c2e",
    hightlight: "#4b8c8d",
    primaryColor: "#a9a49b",
    secondaryHightlight: "#4a5a57"
})

