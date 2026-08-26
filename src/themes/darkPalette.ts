import * as stylex from '@stylexjs/stylex';

import { colors } from './palette.stylex';

// Dark counterpart of the default theme. Every text/background pair keeps at
// least WCAG AA contrast (4.5:1): body #d7dbe1 on #1b1d21 ≈ 12:1, headings
// #4ec7b9 ≈ 8:1, links #7fb3f5 ≈ 7:1.
export const dark = stylex.createTheme(colors, {
  primaryBackground: '#15171b',
  primaryColor: '#e3e6eb',
  secondaryBackground: '#22252b',
  secondaryColor: '#d7dbe1',
  hightlight: '#45d0c1',
  secondaryHightlight: '#3fb2a5',
  bold: '#5fd9cb',
  pageBackground: '#1b1d21',
  pageColor: '#d7dbe1',
  pageHightlight: '#4ec7b9',
  hyper: '#7fb3f5',
});
