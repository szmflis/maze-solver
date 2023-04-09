import { useSelector } from 'react-redux'
import { AppState } from '../store'

export const useSimulationService = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)

    const shouldDisableSimulationControls = () => {
        if (simulationState.isRunning) return true
        if (!simulationState.isRunning && simulationState.simulationStep !== 0) return true
        return false
    }

    return { shouldDisableSimulationControls }
}
