
import { ForwardedRef, forwardRef, type ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { PageSize } from './types';

import { size } from './page.stylex'

const styles = stylex.create({
    page: {
        width: size.pageWidth,
        height: size.pageHeight,
        paddingLeft: size.pageHorizontalPadding,
        paddingRight: size.pageHorizontalPadding,
        paddingTop: size.pageVerticalPadding,
        paddingBottom: size.pageVerticalPadding,
        background: 'white',
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
    }
})

export type PageProps = PageSize & { children: ReactNode }

const createAliasedCssVars = <K extends string,V>(vars: stylex.VarGroup<Readonly<{
    [key in K]?: V
}>, symbol>, aliases: {
    [key in K]?: {
        alias: string,
        value?: V
    }
}) => {
    return Object.entries<{
        alias: string,
        value?: V
    }>(aliases as {[key in string]: {
        alias: string,
        value?: V
    }}).reduce((aliased, [cssVar, {alias, value}]) => {
        const aliasVar = `--${alias}`
        return {
            ...aliased,
            [aliasVar]: value,
            [vars[cssVar as K].slice(4, -1)]: `var(${aliasVar})`
        }
    }, {} as Record<string, unknown>)
}

const sanitizeUnits = <T,>(unit: T | number) => typeof unit === 'number' ? `${unit}px` as const : unit 

const Page = forwardRef(
    function Page(
        {
            children, 
            width = 'auto',
            height = 'auto',
            horizontalMargin = 0,
            verticalMargin = 0
        }: PageProps,
        ref: ForwardedRef<HTMLDivElement>
    ) {
        const aliasStyles = createAliasedCssVars(
            size,
            {
                pageWidth: {
                    alias: 'pageWidth',
                    value: sanitizeUnits(width)
                },
                pageHeight: {
                    alias: 'pageHeight',
                    value: sanitizeUnits(height)
                },
                pageHorizontalPadding: {
                    alias: 'pageHorizontalPadding',
                    value: sanitizeUnits(horizontalMargin)
                },
                pageVerticalPadding: {
                    alias: 'pageVerticalPadding',
                    value: sanitizeUnits(verticalMargin)
                }
            }
        );
        const { className, style } = stylex.props(styles.page)
        return (
        <div ref={ref} className={`page ${className}`} style={{
            ...style,
            ...aliasStyles
        }} >
            {children}
        </div>
        )
    }
)

export default Page