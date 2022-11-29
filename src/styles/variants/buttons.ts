import colors from '../colors'

export default {
    primary: {
        background: colors.primary,
        color: colors.white
    },
    secondary: {
        background: colors.primaryLight,
        color: colors.white
    },
    warning: {
        background: colors.warning
    },
    success: {
        background: colors.success,
        color: colors.white
    },
    cancel: {
        background: colors.danger
    },
    transparent: {
        background: 'inherit',
        'box-shadow': 'none',
        '&:hover': {
            'box-shadow': 'none',
            'background-color': colors.grey,
            transform: 'none'
        },
        '&:active': {
            'background-color': colors.greyDark
        }
    },
    disabled: {
        cursor: 'inherit',
        background: colors.disabled,
        '&:hover': {
            background: colors.disabled,
            transform: 'translateY(0)',
            'box-shadow': '0px 8px 15px rgba(0, 0, 0, 0.1);'
        },
        '&:active': {
            outline: 'none'
        },
        '&:focus': {
            outline: 'none'
        }
    }
}
