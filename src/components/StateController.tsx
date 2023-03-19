import { stat } from 'fs'
import React from 'react'
import { useSelector } from 'react-redux'
import { Board } from '../classes/Board'
import { useBinaryTreeMazeGenerator } from '../mazeGenerators/BinaryTreeMazeGenerator'
import { AppState } from '../store'
import { boardActionDispatcher } from '../store/board/actions'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { Coordinate } from '../utils/Coordinate'

export const StateController: React.FC = () => {

    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const boardState = useSelector((state: AppState) => state.boardReducer)

    const simulationService = useBinaryTreeMazeGenerator(new Coordinate(0, 0))

    const test = () => {
        simulationActionDispatcher.resetSimulation()
        // simulationActionDispatcher.setBoard(new Board(10, 10))
    }

    const shouldDisableSizeAdjustments = () => {
        if (simulationState.isRunning) return true
        if (!simulationState.isRunning && simulationState.simulationStep !== 0) return true
        return false
    }

    return (
        <div>
            <button
                onClick={() => boardActionDispatcher.changeBoardWidth(boardState.boardWidth + 20)}
                disabled={shouldDisableSizeAdjustments()}
            >
                increase width
            </button>
            <button
                onClick={() => boardActionDispatcher.changeBoardHeight(boardState.boardHeight + 20)}
                disabled={shouldDisableSizeAdjustments()}
            >
                increase height
            </button>
            <button
                onClick={() => simulationActionDispatcher.startSimulation()}
                disabled={simulationState.isRunning}
            >
                start!
            </button>
            <button onClick={() => simulationActionDispatcher.stopSimulation()}>
                stop!
            </button>
            <button onClick={() => test()}>
                reset!
            </button>
            <button onClick={() => simulationService.step()}>
                step!
            </button>
            {simulationState.simulationStep}
        </div>
    )
}
