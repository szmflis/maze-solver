import React from 'react'
import { StyledCard } from '../Card/Card'
import { FlexBox } from '../FlexBox/FlexBox'
import { Sliders } from './Sliders'
import { ButtonsContainer } from './ButtonsContainer'

export const ControlPanel: React.FC = () => {
    return (
        <StyledCard
            header={'Control Center'}
            flexGrow={1}
        >
            <FlexBox
                flexDirection={'column'}
                alignItems={'center'}
            >
                <Sliders />
                <ButtonsContainer />
            </FlexBox>
        </StyledCard>
    )
}
