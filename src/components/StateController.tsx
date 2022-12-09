import React from 'react'
import { useSelector } from 'react-redux'
import { useSimulationService } from '../hooks/SimulationService'
import { AppState } from '../store'
import { simulationActionDispatcher } from '../store/simulation/actions'

export const StateController: React.FC = () => {
    const boardWidth = useSelector<AppState, number>(
        (state: AppState) => state.simulationReducer.boardWidth)

    const boardHeight = useSelector<AppState, number>(
        (state: AppState) => state.simulationReducer.boardHeight)

    const simulationService = useSimulationService()

    return (
        <div>
            {boardWidth}
            <button onClick={() => simulationActionDispatcher.changeBoardWidth(boardWidth + 20)}>
                increase width
            </button>
            <button onClick={() => simulationActionDispatcher.changeBoardHeight(boardHeight + 20)}>
                increase height
            </button>
            <button onClick={() => simulationActionDispatcher.startSimulation()}>
                start!
            </button>
            <button onClick={() => simulationActionDispatcher.stopSimulation()}>
                stop!
            </button>
        </div>
    )
}
