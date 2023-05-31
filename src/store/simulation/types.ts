export type MazeGenAlgorithm = 'BINARY_TREE' | 'DEPTH_FIRST_SEARCH'

export interface SimulationState {
    readonly isRunning: boolean
    readonly simulationStep: number
    readonly mazeGenerationAlgorithm: MazeGenAlgorithm
    readonly simulationSpeed: number
}
