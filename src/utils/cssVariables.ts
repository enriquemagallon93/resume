import * as stylex from '@stylexjs/stylex';

/**
 * @param cssVar css var name wrapped inside a css `var()`. I.e. `"var(--x)"` 
 * @returns the unwrappep name of the css var. I.e. `"--x"` or `""` if a wrapped css var was not found
 */
export const getCssVarName = (cssVar: string): string => {
  return cssVar.match(/var\(([^)]+)\)/i)?.[1] || '';
}

/**
 * Stylex Css vars are both, created with dynamic unknown names and not editable at runtime
 * (meaning we can not set a dynamic value to them)
 * 
 * @param stylexCssVars 
 * @param aliassesForStylexCssVars 
 * @returns 
 */
export const styleStylexCssVars =
<StylexCssVarKey extends string,StylexCssVarValue>(stylexCssVars: stylex.VarGroup<Readonly<{
    [key in StylexCssVarKey]?: StylexCssVarValue
}>, symbol>, aliassesForStylexCssVars: {
    [key in StylexCssVarKey]?: {
        alias: string,
        newValueForCssVar?: StylexCssVarValue
    }
}) => {
    type AliasEntry = NonNullable<typeof aliassesForStylexCssVars[StylexCssVarKey]>
    return Object.entries<AliasEntry>(aliassesForStylexCssVars as {[key in string]: {
        alias: string,
        value?: StylexCssVarValue
    }}).reduce((previousAliasses, [cssVar, {alias, newValueForCssVar}]) => {
      const aliasVar = `--${alias}`
      const stylexCssVar = stylexCssVars[cssVar as StylexCssVarKey];
      const stylexCssVarName = getCssVarName(stylexCssVar);
      return {
        ...previousAliasses,
        [aliasVar]: newValueForCssVar,
        [stylexCssVarName]: `var(${aliasVar})`
      }
    }, {} as Record<string, unknown>)
}