import * as stylex from '@stylexjs/stylex';

import { colors } from './palette.stylex';

// Dracula accents (https://draculatheme.com/spec) recalibrated for contrast.
// Light mode: official dark bands (#282a36) with the official foreground
// (#f8f8f2) and a darkened purple for headings on the light page (≈7:1).
export const dracula = stylex.createTheme(colors, {
  primaryBackground: '#282a36',
  primaryColor: '#f8f8f2',
  secondaryBackground: '#1e2029',
  secondaryColor: '#f8f8f2',
  hightlight: '#ff79c6',
  secondaryHightlight: '#bd93f9',
  bold: '#8be9fd',
  pageBackground: '#f8f8f2',
  pageColor: '#343746',
  pageHightlight: '#6d3bbd',
  hyper: '#1d4ed8',
});

// Dark mode: everything sits on official Dracula surfaces, where the spec's
// accent colors already clear AA (pink ≈6.5:1, purple ≈5.6:1, cyan ≈9.8:1).
export const darkDracula = stylex.createTheme(colors, {
  primaryBackground: '#1e2029',
  primaryColor: '#f8f8f2',
  secondaryBackground: '#343746',
  secondaryColor: '#f8f8f2',
  hightlight: '#ff79c6',
  secondaryHightlight: '#bd93f9',
  bold: '#ffb86c',
  pageBackground: '#282a36',
  pageColor: '#f8f8f2',
  pageHightlight: '#bd93f9',
  hyper: '#8be9fd',
});
