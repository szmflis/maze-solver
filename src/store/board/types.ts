import { Maze } from '../../classes/Maze'

export interface BoardState {
    readonly boardWidth: number
    readonly boardHeight: number
    readonly board: Maze
}
