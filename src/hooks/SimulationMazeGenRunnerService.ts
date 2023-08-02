import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { useInterval } from './useInterval'
import { boardActionDispatcher } from '../store/board/actions'
import { statisticsActionDispatcher } from '../store/statistics/actions'
import { useMazeGeneratingService } from './MazeGeneratingService'

export const useSimulationMazeGenRunnerService = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)

    const mazeGen = useMazeGeneratingService()

    useInterval(() => {
        step()
        statisticsActionDispatcher.setMeasuredExecutionTime(10)
    }, simulationState.isRunning ? simulationState.simulationSpeed : null)

    const step = () => {
        if (simulationState.simulationStep === 0) {
            boardActionDispatcher.checkEntireBoard()
        }
        const board = mazeGen.step()
        boardActionDispatcher.setBoard(board)
        simulationActionDispatcher.incrementSimulationStep()
    }

    return { step }
}
export {}
