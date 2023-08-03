import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { useInterval } from './useInterval'
import { boardActionDispatcher } from '../store/board/actions'
import { statisticsActionDispatcher } from '../store/statistics/actions'
import { useMazeGeneratingService } from './MazeGeneratingService'
import { useMazeSolvingService } from './MazeSolvingService'

export const useSimulationMazeGenRunnerService = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)

    const mazeGen = useMazeGeneratingService()
    const mazeSolver = useMazeSolvingService()

    useInterval(() => {
        step()
        statisticsActionDispatcher.setMeasuredExecutionTime(10)
    }, simulationState.isRunning ? simulationState.simulationSpeed : null)

    const step = () => {
        if (simulationState.simulationStep === 0) {
            boardActionDispatcher.unvisitEntireBoard()
        }
        console.log(simulationState.simulationMode)
        if (simulationState.simulationMode === 'MAZE_SOLVE') {
            const board = mazeSolver.step()
            boardActionDispatcher.setBoard(board)
            simulationActionDispatcher.incrementSimulationStep()
        }
        if (simulationState.simulationMode === 'MAZE_GEN') {
            const board = mazeGen.step()
            boardActionDispatcher.setBoard(board)
            simulationActionDispatcher.incrementSimulationStep()
        }
    }

    return { step }
}
export {}
