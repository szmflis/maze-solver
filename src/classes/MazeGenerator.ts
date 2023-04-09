import { Board } from './Board'

export interface MazeGenerator {
    step: () => Board
}
