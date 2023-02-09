import { useSelector } from 'react-redux'
import { AppState } from '../store'

export const useSimulationService = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
}
