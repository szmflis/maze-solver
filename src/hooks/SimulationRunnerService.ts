import { useInterval } from './useInterval'
import { useMazeGeneratingService } from './MazeGeneratingService'
import { useMazeSolvingService } from './MazeSolvingService'
import { Coordinate } from '../utils/Coordinate'
import { CellState } from '../classes/model/Cell'
import { useSimulationService } from './SimulationService'
import { useBoardService } from './BoardService'

export const useSimulationRunnerService = () => {
    const mazeGenerator = useMazeGeneratingService()
    const mazeSolver = useMazeSolvingService()
    const simulationService = useSimulationService()
    const boardService = useBoardService()

    useInterval(() => {
        step()
    }, simulationService.isSimulationRunning()
        ? simulationService.getSimulationSpeed()
        : null)

    const step = () => {
        switch (simulationService.getSimulationMode()) {
        case 'MAZE_DRAW':
            console.error('Simulation drawing not implemented!')
            break
        case 'MAZE_GEN':
            if (simulationService.getSimulationStep() === 0) {
                boardService.unvisitEntireBoard()
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
        boardService.setBoard(board)
        simulationService.incrementSimmulationStep()
        if (mazeSolver.getIsAlgorithmFinished()) {
            simulationService.finishSimulation()
        }
    }

    const mazeGenerationStep = () => {
        const board = mazeGenerator.step()
        boardService.setBoard(board)
        simulationService.incrementSimmulationStep()
        if (mazeGenerator.getIsAlgorithmFinished()) {
            simulationService.finishSimulation()
            const bottomRight = new Coordinate(board.getBoardWidth() - 1, board.getBoardHeight() - 1)
            boardService.setBoardCellState(bottomRight, CellState.EXIT)
            const topLeft = new Coordinate(0, 0)
            boardService.setBoardCellState(topLeft, CellState.ENTRY)
        }
    }

    return { step }
}
export {}
