export interface SimulationState {
    readonly isRunning: boolean
    readonly simulationStep: number
    readonly mazeGenerationAlgorithm: 'BINARY_SEARCH' | 'DEPTH_FIRST'
}
