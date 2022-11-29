import colors from './colors'
import typography from './typography'
import layout from './layout'
import buttons from './variants/buttons'
import shadows from './shadows'

export const theme = {
    colors,
    ...typography,
    ...layout,
    shadows,
    buttons
}

export type Theme = typeof theme
