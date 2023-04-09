import { RawSelect, RawSelectProps } from './RawSelect'
import { space, SpaceProps } from 'styled-system'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

export interface SelectProps extends RawSelectProps, SpaceProps {
  rect?: boolean
}

export const Select = styled(RawSelect)<SelectProps>`
  position: relative;
  display: inline-block;

  .dropdown {
    position: absolute;
    top: 105%;
    left: 0;
    z-index: 2;

    color: ${theme.colors.black};
    background-color: ${theme.colors.white};
    box-shadow: ${theme.shadows.mdShadow_1};
    min-width: 200px;
    animation: ${theme.keyframes.fadeInScale} 0.2s;
  }

  .dropdownOption {
    padding: 0.75rem;
    cursor: pointer;
    &:hover {
      background-color: ${theme.colors.primaryLightest};
    }
  }

  button {
    cursor: pointer;
    outline: none;
    font-family: inherit;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 200px;
    padding:  1rem;
    background-color: ${theme.colors.white};

    border: 1px solid ${theme.colors.primary};
    border-radius: ${({ rect }) => (rect ? 0 : '1.5rem')};

    font-size: ${theme.fontSizes[3]};

    &:hover {
      background-color: ${theme.colors.primaryLightest};
    }
    
    &:disabled {
      background-color: ${theme.colors.greyDark};
    }

    transition: background-color 0.2s;

    border: 1px solid blue;

  }

  ${space};
`
