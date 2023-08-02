import { Maze } from '../../classes/Board'

export interface BoardState {
    readonly boardWidth: number
    readonly boardHeight: number
    readonly board: Maze
}
