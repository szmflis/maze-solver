import { Maze } from '../../classes/model/Maze'

export interface BoardState {
    readonly boardWidth: number
    readonly boardHeight: number
    readonly board: Maze
}
