import React from 'react'
import { FlexBox } from '../FlexBox/FlexBox'
import { Sliders } from './Sliders'
import { SimulationControlButtonsContainer } from './SimulationControlButtonsContainer'
import { AlgorithmSelector } from './AlgorithmSelector'
import { SimulationModeButtonsContainer } from './SimulationModeButtonsContainer'
import { useQuickMazeGenerator } from '../../hooks/QuickMazeGenerator'
import { Button } from '../Button/Button'

export const ControlPanel: React.FC = () => {
    const quickMazeGen = useQuickMazeGenerator()

    return (
        <FlexBox
            flexDirection={'column'}
            alignItems={'center'}
        >
            <SimulationModeButtonsContainer />
            <AlgorithmSelector />
            <Sliders />
            <SimulationControlButtonsContainer />
            <Button
                variant="primary"
                onClick={() => quickMazeGen.quicklyGenerateMaze()}
            >
                quickgen
            </Button>
        </FlexBox>
    )
}
