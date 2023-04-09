import colors from './colors'

export default {
    fontSizeBase: '62.5%',
    fontSizeBaseRem: '1.4rem',
    fontColorBase: colors.white,
    fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    fontSizes: [10, 12, 14, 16, 20, 24, 36, 48, 60, 96].map(
        (n: number) => (n / 10) + 'rem'),
    lineHeights: [10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56].map(
        (n: number) => (n / 10) + 'rem'),
    fontSizeResp: {},
    letterSpacings: {
        extraTight: '0.15px',
        tight: '0.47px',
        normal: '0.53px',
        extra: '0.67px',
        mega: '0.8px'
    },
    fonts: {
        nunito: 'Nunito, Helvetica',
        roboto: 'Roboto, Helvetica'
    }
}
