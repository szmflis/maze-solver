import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { border, color, flex, flexGrow, flexbox, layout, position, shadow, space } from 'styled-system'
import { theme } from '../../styles/theme'
import { FlexBox, FlexProps } from '../FlexBox/FlexBox'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    header: string
}

const Card: React.FC<CardProps> = (props) => {
    return (
        <FlexBox className={props.className}>
            <div className='header'>{props.header}</div>
            <div className='children'>
                {props.children}
            </div>
        </FlexBox>
    )
}

interface StyledCardProps extends FlexProps, CardProps {}

export const StyledCard = styled(Card)<StyledCardProps>`
    flex-direction: column;
    border-radius: ${theme.radii[2]};
    margin: ${theme.space[2]};
    /* width: 100%; */
    /* border: 1px solid red; */

    .header {
        background-color: ${theme.colors.surfaceDark};
        padding: ${theme.space[2]};
        border-radius: ${theme.radii[2]} ${theme.radii[2]} 0 0;
        display: flex;
        justify-content: center;
    };

    .children {
        background-color: ${theme.colors.surface};
        padding: ${theme.space[2]};
        border-radius: 0 0 ${theme.radii[2]} ${theme.radii[2]};
    };

    box-shadow: ${theme.shadows.mdShadow_1};

    ${space};
    ${shadow};
    ${color};
    ${layout};
    ${border};
    ${position};
    ${flexbox};
`
