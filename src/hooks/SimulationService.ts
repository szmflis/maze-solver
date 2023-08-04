import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { simulationActionDispatcher } from '../store/simulation/actions'

export const useSimulationService = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)

    const shouldDisableSimulationControls = () => {
        if (simulationState.isRunning) return true
        if (!simulationState.isRunning && simulationState.simulationStep !== 0) return true
        return false
    }

    const getSimulationSpeed = (): number => {
        return simulationState.simulationSpeed
    }

    const setSimulationSpeed = (newSpeedInMs: number): void => {
        simulationActionDispatcher.setSimulationSpeed(newSpeedInMs)
    }

    return { shouldDisableSimulationControls, getSimulationSpeed, setSimulationSpeed }
}
