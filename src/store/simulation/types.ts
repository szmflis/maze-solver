import { Board } from '../../classes/Board'

export interface SimulationState {
    readonly boardWidth: number
    readonly boardHeight: number
    readonly board: Board
    readonly isRunning: boolean
    readonly simulationStep: number
    readonly mazeGenerationAlgorithm: 'BINARY_SEARCH' | 'DEPTH_FIRST'
}
