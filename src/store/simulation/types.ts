import { Board } from '../../classes/Board'

export interface SimulationState {
    readonly boardWidth: number
    readonly boardHeight: number
    readonly board: Board
}
