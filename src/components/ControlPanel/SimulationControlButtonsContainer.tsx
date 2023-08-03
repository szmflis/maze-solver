import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { simulationActionDispatcher } from '../../store/simulation/actions'
import { theme } from '../../styles/theme'
import { FlexBox } from '../FlexBox/FlexBox'
import { Button } from '../Button/Button'
import { Maze } from '../../classes/Maze'
import { statisticsActionDispatcher } from '../../store/statistics/actions'
import { boardActionDispatcher } from '../../store/board/actions'
import { useSimulationMazeGenRunnerService } from '../../hooks/SimulationMazeGenRunnerService'

export const SimulationControlButtonsContainer: React.FC = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const boardState = useSelector((state: AppState) => state.boardReducer)
    const simulationService = useSimulationMazeGenRunnerService()

    const resetSimulation = () => {
        simulationActionDispatcher.resetSimulation()
        statisticsActionDispatcher.clearStepStack()
        boardActionDispatcher.setBoard(
            new Maze(boardState.boardWidth, boardState.boardHeight))
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
