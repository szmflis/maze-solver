import { Maze } from './Maze'

export interface MazeGenerator {
    step: () => Maze
    getIsAlgorithmFinished: () => boolean
}
