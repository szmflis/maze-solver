import styled from 'styled-components'
import { space, SpaceProps, typography, TypographyProps, variant } from 'styled-system'
import { RawIcon, RawIconProps } from './RawIcon'
import { color, ColorProps } from '../../styles/colorOverride'
import icons from '../../styles/variants/icons'

export interface IconProps extends RawIconProps, SpaceProps, TypographyProps, ColorProps {
  transTime?: number
  variant?: keyof typeof icons
}

const iconVariant = variant({ key: 'icons' })

export const Icon = styled(RawIcon)<IconProps>`
  ${space};
  ${color};
  
  ${typography};
  ${iconVariant};

  transition: ${({ transTime }) => (transTime ?? 0.4)}s;
`
