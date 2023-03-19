import { Board } from '../../classes/Board'

export interface BoardState {
    readonly boardWidth: number
    readonly boardHeight: number
    readonly board: Board
}
