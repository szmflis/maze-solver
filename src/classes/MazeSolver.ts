import { Maze } from './Maze'

export interface MazeSolver {
    step: () => Maze
}
