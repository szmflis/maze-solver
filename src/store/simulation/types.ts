export type MazeGenAlgorithm = 'BINARY_TREE' | 'DEPTH_FIRST_SEARCH'
export type SimulationMode = 'MAZE_GEN' | 'MAZE_SOLVE' | 'MAZE_DRAW'

export interface SimulationState {
    readonly isRunning: boolean
    readonly simulationStep: number
    readonly mazeGenerationAlgorithm: MazeGenAlgorithm
    readonly simulationSpeed: number
    readonly simulationMode: SimulationMode
}
