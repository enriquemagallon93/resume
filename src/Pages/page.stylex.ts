import * as stylex from '@stylexjs/stylex';
import { PageSize } from './types';

export const size = stylex.defineVars({
  pageWidth: 'auto' as PageSize['width'],
  pageHeight: 'auto' as PageSize['height'],
  pageHorizontalPadding: 0 as PageSize['horizontalMargin'],
  pageVerticalPadding: 0 as PageSize['verticalMargin'],
});