import React from 'react'
import { theme } from '../../styles/theme'
import { FlexBox } from '../FlexBox/FlexBox'
import { Button } from '../Button/Button'
import { useSimulationService } from '../../hooks/SimulationService'

export const SimulationModeButtonsContainer: React.FC = () => {
    const simulationService = useSimulationService()

    return (
        <FlexBox
            width="100%"
            justifyContent="space-evenly"
            marginBottom={theme.space[2]}
        >
            <Button
                onClick={() => simulationService.setSimulationMode('MAZE_GEN')}
                disabled={simulationService.shouldDisableSimulationModeSwitcher()}
                variant={simulationService.getSimulationMode() === 'MAZE_GEN' ? 'primary' : 'secondary'}
            >
                        Generation
            </Button>
            <Button
                onClick={() => simulationService.setSimulationMode('MAZE_SOLVE')}
                disabled={simulationService.shouldDisableSimulationModeSwitcher()}
                variant={simulationService.getSimulationMode() === 'MAZE_SOLVE' ? 'primary' : 'secondary'}
            >
                        Solving
            </Button>
        </FlexBox>
    )
}
