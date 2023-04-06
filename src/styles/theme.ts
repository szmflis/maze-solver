import colors from './colors'
import typography from './typography'
import layout from './layout'
import buttons from './variants/buttons'
import shadows from './shadows'
import sliders from './variants/sliders'

export const theme = {
    colors,
    ...typography,
    ...layout,
    shadows,
    buttons,
    sliders
}

export type Theme = typeof theme
