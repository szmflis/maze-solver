import { Maze } from './Board'

export interface MazeGenerator {
    step: () => Maze
}
