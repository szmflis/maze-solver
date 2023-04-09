import { darken } from 'polished'
import colors from '../colors'

export default {
    bgFade: {
        '&:hover': {
            background: darken(0.1, colors.greyLight)
        }
    },
    spin: {
        '&:hover': {
            transform: 'rotate(180deg)'
        }
    },
    scale: {
        '&:hover': {
            transform: 'scale(1.2)'
        }
    },
    scaleRotate: {
        '&:hover': {
            transform: 'scale(1.2) rotate(180deg)'
        }
    }
}
