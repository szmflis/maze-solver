import colors from '../colors'

export default {
    disabled: {
        cursor: 'not-allowed',
        input: {
            cursor: 'not-allowed',
            'background-color': colors.greyDarkest,
            '&::-webkit-slider-thumb': {
                cursor: 'not-allowed',
                background: colors.disabled
            },
            '&::-moz-range-thumb': {
                cursor: 'not-allowed',
                background: colors.disabled
            }
        }
    }
}
