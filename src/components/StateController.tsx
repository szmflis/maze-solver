import React from 'react'
import { useSelector } from 'react-redux'
import { Board } from '../classes/Board'
import { useSimulationRunnerService } from '../hooks/SimulationRunnerService'
import { AppState } from '../store'
import { simulationActionDispatcher } from '../store/simulation/actions'

export const StateController: React.FC = () => {

    const simulationState = useSelector((state: AppState) => state.simulationReducer)

    const simulationService = useSimulationRunnerService()

    const test = () => {
        simulationActionDispatcher.resetSimulation()
        // simulationActionDispatcher.setBoard(new Board(10, 10))
    }

    const shouldDisableSizeAdjustments = () => {
        if (simulationState.isRunning) return true
        if (!simulationState.isRunning && simulationState.simulationStep !== 0) return true
        return false
    }

    return (
        <div>
            <button
                onClick={() => simulationActionDispatcher.changeBoardWidth(simulationState.boardWidth + 20)}
                disabled={shouldDisableSizeAdjustments()}
            >
                increase width
            </button>
            <button
                onClick={() => simulationActionDispatcher.changeBoardHeight(simulationState.boardHeight + 20)}
                disabled={shouldDisableSizeAdjustments()}
            >
                increase height
            </button>
            <button
                onClick={() => simulationActionDispatcher.startSimulation()}
                disabled={simulationState.isRunning}
            >
                start!
            </button>
            <button onClick={() => simulationActionDispatcher.stopSimulation()}>
                stop!
            </button>
            <button onClick={() => test()}>
                reset!
            </button>
            <button onClick={() => simulationService.step()}>
                step!
            </button>
            {simulationState.simulationStep}
        </div>
    )
}
