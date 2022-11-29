import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import {
    border,
    BorderProps,
    layout,
    LayoutProps,
    position,
    PositionProps,
    shadow,
    ShadowProps,
    space,
    SpaceProps,
    typography,
    TypographyProps
} from 'styled-system'

import { color, ColorProps } from '../../styles/colorOverride'

export interface BoxProps
  extends HTMLAttributes<HTMLDivElement>,
    SpaceProps,
    ShadowProps,
    ColorProps,
    LayoutProps,
    TypographyProps,
    PositionProps,
    BorderProps {
  ref?: React.MutableRefObject<HTMLDivElement>
}

export const Box = styled.div<BoxProps>`
  ${space};
  ${shadow};
  ${color};
  ${typography};
  ${layout};
  ${border};
  ${position};
`
