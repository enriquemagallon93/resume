
import { ForwardedRef, forwardRef, type ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { PageSize } from './types';

import type {StyleXStyles} from '@stylexjs/stylex';
import { size } from './page.stylex';
import { styleStylexCssVars } from '../utils/cssVariables';
import { colors } from '../themes/palette.stylex';

const styles = stylex.create({
  page: {
    width: size.pageWidth,
    height: size.pageHeight,
    paddingLeft: size.pageHorizontalPadding,
    paddingRight: size.pageHorizontalPadding,
    paddingTop: size.pageVerticalPadding,
    paddingBottom: size.pageVerticalPadding,
    background: colors.pageBackground,
    color: colors.pageColor,
    display: 'block',
    margin: '0 auto',
    marginTop: '0.5cm',
    marginBottom: '0.5cm',
    boxShadow: '0 0 0.5cm rgba(0, 0, 0, 0.5)',
    fontFamily: "'Ubuntu', sans-serif",
    textRendering: 'optimizeLegibility',
    textSizeAdjust: '100%',
    fontStyle: 'normal',
    fontVariantAlternates: 'normal',
    fontVariantCaps: 'normal',
    fontVariantEastAsian: 'normal',
    fontVariantLigatures: 'normal',
    fontVariantNumeric: 'normal',
    fontVariantPosition: 'normal',
    unicodeBidi: 'isolate',
    fontSize: '12px',
    lineHeight: '18px',
    position: 'relative',
    "@media print": {
      width: '100%',
      height: 'auto',
      margin: '0 !important',
      boxShadow: 'none',
    }
  }
});

export type PageProps = PageSize & { children: ReactNode; style?: StyleXStyles; }



const sanitizeUnits = <T,>(unit: T | number) => typeof unit === 'number' ? `${unit}px` as const : unit; 

const Page = forwardRef(
  function Page(
    {
      children, 
      width = 'auto',
      height = 'auto',
      horizontalMargin = 0,
      verticalMargin = 0,
      style: parentStyles,
    }: PageProps,
    ref: ForwardedRef<HTMLDivElement>
  ) {
    const cssVarsStyles = styleStylexCssVars(
      size,
      {
        pageWidth: {
          alias: 'pageWidth',
          newValueForCssVar: sanitizeUnits(width)
        },
        pageHeight: {
          alias: 'pageHeight',
          newValueForCssVar: sanitizeUnits(height)
        },
        pageHorizontalPadding: {
          alias: 'pageHorizontalPadding',
          newValueForCssVar: sanitizeUnits(horizontalMargin)
        },
        pageVerticalPadding: {
          alias: 'pageVerticalPadding',
          newValueForCssVar: sanitizeUnits(verticalMargin)
        }
      }
    );
    const { className, style } = stylex.props(styles.page, parentStyles);
    return (
      <div ref={ref} className={`page ${className}`} style={{
        ...style,
        ...cssVarsStyles
      }} >
        {children}
      </div>
    );
  }
);

export default Page;
