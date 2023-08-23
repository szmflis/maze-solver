import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { MazeGenAlgorithm, SimulationMode } from '../store/simulation/types'
import { useBoardService } from './BoardService'

export const useSimulationService = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)

    const boardService = useBoardService()

    const shouldDisableSimulationControls = (): boolean => {
        if (simulationState.isRunning) return true
        if (!simulationState.isRunning && simulationState.simulationStep !== 0) return true
        return false
    }

    const shouldDisableSimulationModeSwitcher = (): boolean => {
        if (simulationState.simulationStep === 0) return false
        return !simulationState.simulationFinished
    }

    const getSimulationSpeed = (): number => {
        return simulationState.simulationSpeed
    }

    const setSimulationSpeed = (newSpeedInMs: number): void => {
        simulationActionDispatcher.setSimulationSpeed(newSpeedInMs)
    }

    const isSimulationRunning = (): boolean => {
        return simulationState.isRunning
    }

    const getSimulationMode = (): SimulationMode => {
        return simulationState.simulationMode
    }

    const getSimulationStep = (): number => {
        return simulationState.simulationStep
    }

    const incrementSimmulationStep = (): void => {
        simulationActionDispatcher.incrementSimulationStep()
    }

    const finishSimulation = (): void => {
        simulationActionDispatcher.finishSimulation()
    }

    const getSimulationAlgorithm = (): MazeGenAlgorithm => {
        return simulationState.selectedAlgorithm
    }

    const resetSimulation = (): void => {
        simulationActionDispatcher.resetSimulation()
    }

    const stopSimulation = (): void => {
        simulationActionDispatcher.stopSimulation()
    }

    const startSimulation = (): void => {
        simulationActionDispatcher.startSimulation()
    }

    const setSimulationMode = (simMode: SimulationMode): void => {
        if (simMode === 'MAZE_GEN') {
            boardService.resetBoard()
        }
        boardService.unvisitBoardWithEntryAndExit()
        resetSimulation()
        simulationActionDispatcher.setSimulationModeAlogrithm(simMode)
    }

    const setMazeGeneratingAlgorithm = (mazeGenAlg: MazeGenAlgorithm) => {
        simulationActionDispatcher.setMazeGeneratingAlogrithm(mazeGenAlg)
    }

    const setIsSimulationFinished = (isFinished: boolean) => {
        simulationActionDispatcher.setSimulationFinished(isFinished)
    }

    return {
        shouldDisableSimulationControls,
        getSimulationSpeed,
        setSimulationSpeed,
        isSimulationRunning,
        getSimulationMode,
        getSimulationStep,
        incrementSimmulationStep,
        finishSimulation,
        getSimulationAlgorithm,
        resetSimulation,
        stopSimulation,
        startSimulation,
        setSimulationMode,
        setMazeGeneratingAlgorithm,
        setIsSimulationFinished,
        shouldDisableSimulationModeSwitcher
    }
}
