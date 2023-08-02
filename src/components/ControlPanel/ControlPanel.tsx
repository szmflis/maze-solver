import React from 'react'
import { FlexBox } from '../FlexBox/FlexBox'
import { Sliders } from './Sliders'
import { SimulationControlButtonsContainer } from './SimulationControlButtonsContainer'
import { AlgorithmSelector } from './AlgorithmSelector'
import { SimulationModeButtonsContainer } from './SimulationModeButtonsContainer'

export const ControlPanel: React.FC = () => {
    return (
        <FlexBox
            flexDirection={'column'}
            alignItems={'center'}
        >
            <AlgorithmSelector />
            <Sliders />
            <SimulationControlButtonsContainer />
            <SimulationModeButtonsContainer />
        </FlexBox>
    )
}
