import React from 'react'
import { theme } from '../../styles/theme'
import { FlexBox } from '../FlexBox/FlexBox'
import { Button } from '../Button/Button'
import { useSimulationRunnerService } from '../../hooks/SimulationRunnerService'
import { useBoardService } from '../../hooks/BoardService'
import { useSimulationService } from '../../hooks/SimulationService'
import { useStatisticsService } from '../../hooks/StatisticsService'

export const SimulationControlButtonsContainer: React.FC = () => {
    const simulationRunnerService = useSimulationRunnerService()
    const simulationService = useSimulationService()
    const boardService = useBoardService()
    const statisticsService = useStatisticsService()

    const resetSimulation = () => {
        simulationService.resetSimulation()
        statisticsService.clearStepStack()
        boardService.resetBoard()
    }

    return (
        <FlexBox
            width="100%"
            justifyContent="space-evenly"
            marginTop={theme.space[2]}
        >
            <Button
                onClick={() => simulationService.startSimulation()}
                disabled={simulationService.isSimulationRunning()}
                variant='primary'
            >
                        Start
            </Button>
            <Button
                onClick={() => simulationService.stopSimulation()}
                variant='warning'
            >
                        Stop
            </Button>
            <Button
                onClick={() => resetSimulation()}
                variant='cancel'
                disabled={simulationService.isSimulationRunning()}
            >
                        Reset
            </Button>
            <Button
                onClick={() => simulationRunnerService.step()}
                disabled={simulationService.isSimulationRunning()}
                variant='primary'
            >
                        Step
            </Button>
        </FlexBox>
    )
}
