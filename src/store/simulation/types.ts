export type MazeGenAlgorithm = 'BINARY_TREE' | 'DEPTH_FIRST_SEARCH' | 'HUNT_AND_KILL'
export type MazeSolveAlgorithm = 'DEPTH_FIRST_SEARCH'
export type Algorithm = MazeGenAlgorithm | MazeSolveAlgorithm
export type SimulationMode = 'MAZE_GEN' | 'MAZE_SOLVE'

export interface SimulationState {
    readonly isRunning: boolean
    readonly simulationStep: number
    readonly selectedAlgorithm: Algorithm
    readonly simulationSpeed: number
    readonly simulationMode: SimulationMode
    readonly simulationFinished: boolean
}
