/* eslint-disable indent */
import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { space, SpaceProps, typography, TypographyProps } from 'styled-system'
import { color, ColorProps } from '../../styles/colorOverride'

export interface CustomTypographyProps
  extends HTMLAttributes<HTMLFontElement>,
    SpaceProps,
    ColorProps,
    TypographyProps {}

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement>, SpaceProps, ColorProps, TypographyProps {
  noDecoration?: boolean
  reverse?: boolean
}

export const Title = styled.h1<CustomTypographyProps>`
  margin: 0;
  padding: 0;
  font-size: ${theme.fontSizes[5]};
  font-weight: ${theme.fontWeights[4]};
  letter-spacing: ${theme.letterSpacings.mega};

  ${space};
  ${color};
  ${typography};
`

export const SectionTitle = styled.h2<CustomTypographyProps>`
  margin: 0;
  padding: 0;
  font-size: ${theme.fontSizes[4]};
  font-weight: ${theme.fontWeights[4]};
  letter-spacing: ${theme.letterSpacings.extra};

  ${space};
  ${color};
  ${typography};
`

export const Subtitle = styled.h3<CustomTypographyProps>`
  margin: 0;
  padding: 0;
  font-size: ${theme.fontSizes[3]};
  font-weight: ${theme.fontWeights[4]};
  letter-spacing: ${theme.letterSpacings.normal};

  ${space};
  ${color};
  ${typography};
`

export const Paragraph = styled.p<CustomTypographyProps>`
  margin: 0;
  padding: 0;
  font-size: ${theme.fontSizes[3]};
  font-weight: ${theme.fontWeights[3]};
  letter-spacing: ${theme.letterSpacings.normal};
  line-height: ${theme.lineHeights[4]};
  
  ${space};
  ${color};
  ${typography};
`

export const Span = styled.span<CustomTypographyProps>`
  margin: 0;
  padding: 0;
  font-size: ${theme.fontSizes[3]};
  font-weight: ${theme.fontWeights[3]};
  letter-spacing: ${theme.letterSpacings.normal};
  line-height: ${theme.lineHeights[4]};

  ${space};
  ${color};
  ${typography};
`

export const Caption = styled.p<CustomTypographyProps>`
  margin: 0;
  padding: 0;
  font-size: ${theme.fontSizes[2]};
  font-weight: ${theme.fontWeights[3]};
  letter-spacing: ${theme.letterSpacings.tight};

  ${space};
  ${color};
  ${typography};
`

export const HighlightedNumber = styled.p<CustomTypographyProps>`
  margin: 0;
  padding: 0;
  font-size: ${theme.fontSizes[5]};
  font-weight: ${theme.fontWeights[8]};
  letter-spacing: ${theme.letterSpacings.mega};

  ${space};
  ${color};
  ${typography};
`

export const Status = styled.p<CustomTypographyProps>`
  margin: 0;
  padding: 0;
  font-size: ${theme.fontSizes[5]};
  font-weight: ${theme.fontWeights[3]};
  letter-spacing: ${theme.letterSpacings.normal};

  ${space};
  ${color};
  ${typography};
`
