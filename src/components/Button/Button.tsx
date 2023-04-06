/* eslint-disable indent */
import styled, { css } from 'styled-components'
import {
  border,
  BorderProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  ShadowProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  variant
} from 'styled-system'
import { theme } from '../../styles/theme'

import buttons from '../../styles/variants/buttons'
import { Caption } from '../Typography/Typography'

import { RawButton, RawButtonProps } from './RawButton'

export interface ButtonProps
  extends RawButtonProps,
    SpaceProps,
    ShadowProps,
    LayoutProps,
    TypographyProps,
    PositionProps,
    BorderProps {
  variant?: keyof typeof buttons
  small?: boolean
  reverse?: boolean
}

const buttonStyle = variant({ key: 'buttons' })

export const Button = styled(RawButton)<ButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    
    cursor: pointer;
    border: none;
    outline: none;
    text-transform: uppercase;

    height: 34px;
    padding: 0 2rem;

    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
    border-radius: 10px;

    ${Caption} {
      font-family: inherit;
      font-size: ${theme.fontSizes[1]};
      font-weight: ${theme.fontWeights[5]};
      letter-spacing: 2.5px;
    }

    ${border};
    ${layout};
    ${position};
    ${space};
    ${typography};
    ${buttonStyle};
    
    ${(props) => props.disabled && buttons.disabled};
`
