import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { simulationActionDispatcher } from '../../store/simulation/actions'
import { theme } from '../../styles/theme'
import { FlexBox } from '../FlexBox/FlexBox'
import { Button } from '../Button/Button'
import { statisticsActionDispatcher } from '../../store/statistics/actions'
import { useSimulationRunnerService } from '../../hooks/SimulationRunnerService'
import { useBoardService } from '../../hooks/BoardService'

export const SimulationControlButtonsContainer: React.FC = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const simulationService = useSimulationRunnerService()
    const boardService = useBoardService()

    const resetSimulation = () => {
        simulationActionDispatcher.resetSimulation()
        statisticsActionDispatcher.clearStepStack()
        boardService.resetBoard()
    }

    return (
        <FlexBox
            width="100%"
            justifyContent="space-evenly"
            marginTop={theme.space[2]}
        >
            <Button
                onClick={() => simulationActionDispatcher.startSimulation()}
                disabled={simulationState.isRunning}
                variant='primary'
            >
                        Start
            </Button>
            <Button
                onClick={() => simulationActionDispatcher.stopSimulation()}
                variant='warning'
            >
                        Stop
            </Button>
            <Button
                onClick={() => resetSimulation()}
                variant='cancel'
                disabled={simulationState.isRunning}
            >
                        Reset
            </Button>
            <Button
                onClick={() => simulationService.step()}
                disabled={simulationState.isRunning}
                variant='primary'
            >
                        Step
            </Button>
        </FlexBox>
    )
}
