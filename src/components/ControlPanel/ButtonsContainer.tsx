import React from 'react'
import { useSelector } from 'react-redux'
import { useDepthFirstSearchMazeGenerator } from '../../classes/DepthFirstSearchMazeGenerator'
import { AppState } from '../../store'
import { simulationActionDispatcher } from '../../store/simulation/actions'
import { theme } from '../../styles/theme'
import { Coordinate } from '../../utils/Coordinate'
import { FlexBox } from '../FlexBox/FlexBox'
import { Button } from '../Button/Button'
import { Board } from '../../classes/Board'
import { statisticsActionDispatcher } from '../../store/statistics/actions'
import { boardActionDispatcher } from '../../store/board/actions'

export const ButtonsContainer: React.FC = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const boardState = useSelector((state: AppState) => state.boardReducer)
    const simulationService = useDepthFirstSearchMazeGenerator(new Coordinate(0, 0))

    const resetSimulation = () => {
        simulationActionDispatcher.resetSimulation()
        statisticsActionDispatcher.clearStepStack()
        boardActionDispatcher.setBoard(
            new Board(boardState.boardWidth, boardState.boardHeight))
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
