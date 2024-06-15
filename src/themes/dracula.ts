import * as stylex from '@stylexjs/stylex';

import { colors } from './palette.stylex';

export const dracula = stylex.createTheme(colors, {
  primaryBackground: "#171717",
  secondaryHightlight: "#760064",
  hightlight: "#c900c7",
  primaryColor: "#6272a4",
  secondaryColor: "#ecf7f3",
  bold: "#e96f6f",
  secondaryBackground: "#282a36",
  pageBackground: "#ecf7f3",
  pageColor: "#483422",
  pageHightlight: "#ff5555"
})

export const darkDracula = stylex.createTheme(colors, {
  primaryBackground: "#1a1a18",
  secondaryBackground: "#242424",
  hightlight: "#864E7D",
  secondaryHightlight: "#652757",
  primaryColor: "#63686C",
  secondaryColor: "#A1A499",
  bold: "#85605B",
  pageBackground:"#232A26",
  pageHightlight: "#86544f",
  pageColor: "#978C7F",
  hyper: "#4B5D7C"
})

