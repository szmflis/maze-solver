import React from 'react'
import { FlexBox } from '../FlexBox/FlexBox'
import { Sliders } from './Sliders'
import { SimulationControlButtonsContainer } from './SimulationControlButtonsContainer'
import { AlgorithmSelector } from './AlgorithmSelector'
import { SimulationModeButtonsContainer } from './SimulationModeButtonsContainer'
import { QuickMazeGeneratorButton } from './QuickMazeGeneratorButton'

export const ControlPanel: React.FC = React.memo(() => {
    return (
        <FlexBox
            flexDirection={'column'}
            alignItems={'center'}
        >
            <SimulationModeButtonsContainer />
            <AlgorithmSelector />
            <Sliders />
            <SimulationControlButtonsContainer />
            <QuickMazeGeneratorButton />
        </FlexBox>
    )
})
