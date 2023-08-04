import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { useInterval } from './useInterval'
import { boardActionDispatcher } from '../store/board/actions'
import { statisticsActionDispatcher } from '../store/statistics/actions'
import { useMazeGeneratingService } from './MazeGeneratingService'
import { useMazeSolvingService } from './MazeSolvingService'
import { Coordinate } from '../utils/Coordinate'
import { CellState } from '../classes/model/Cell'

export const useSimulationRunnerService = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const mazeGenerator = useMazeGeneratingService()
    const mazeSolver = useMazeSolvingService()

    useInterval(() => {
        step()
        statisticsActionDispatcher.setMeasuredExecutionTime(10)
    }, simulationState.isRunning ? simulationState.simulationSpeed : null)

    const step = () => {
        switch (simulationState.simulationMode) {
        case 'MAZE_DRAW':
            console.error('Simulation drawing not implemented!')
            break
        case 'MAZE_GEN':
            if (simulationState.simulationStep === 0) {
                boardActionDispatcher.unvisitEntireBoard()
            }
            mazeGenerationStep()
            break
        case 'MAZE_SOLVE':
            mazeSolvingStep()
            break
        }
    }

    const mazeSolvingStep = () => {
        const board = mazeSolver.step()
        boardActionDispatcher.setBoard(board)
        simulationActionDispatcher.incrementSimulationStep()
    }

    const mazeGenerationStep = () => {
        const board = mazeGenerator.step()
        boardActionDispatcher.setBoard(board)
        simulationActionDispatcher.incrementSimulationStep()
        if (mazeGenerator.getIsAlgorithmFinished()) {
            simulationActionDispatcher.finishSimulation()
            const bottomRight = new Coordinate(board.getBoardWidth() - 1, board.getBoardHeight() - 1)
            boardActionDispatcher.setBoardCellState(bottomRight, CellState.EXIT)
        }
    }

    return { step }
}
export {}
