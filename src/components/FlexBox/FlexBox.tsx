import styled from 'styled-components'
import { flexbox, FlexboxProps } from 'styled-system'

import { Box, BoxProps } from '../Box/Box'

export interface FlexProps extends FlexboxProps, BoxProps {}

export const FlexBox = styled(Box)<FlexProps>`
  display: flex;

  ${flexbox};
`
