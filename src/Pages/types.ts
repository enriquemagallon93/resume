type AbsoluteLegthUnit = 'cm' | 'mm' | 'in' | 'px' | 'pt' | 'pc' | '%'

export type PageSize = {
    width?: number | `${number}${AbsoluteLegthUnit}` | 'auto',
    height?: number | `${number}${AbsoluteLegthUnit}` | 'auto'
    horizontalMargin?: number | `${number}${AbsoluteLegthUnit}`
    verticalMargin?: number | `${number}${AbsoluteLegthUnit}`
}