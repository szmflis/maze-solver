import React from 'react'
import { FlexBox } from '../FlexBox/FlexBox'
import { Sliders } from './Sliders'
import { ButtonsContainer } from './ButtonsContainer'
import { AlgorithmSelector } from './AlgorithmSelector'

export const ControlPanel: React.FC = () => {
    return (
        <FlexBox
            flexDirection={'column'}
            alignItems={'center'}
        >
            <AlgorithmSelector />
            <Sliders />
            <ButtonsContainer />
        </FlexBox>
    )
}
