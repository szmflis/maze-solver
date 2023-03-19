import { Action, bindActionCreators } from 'redux'
import store from '..'

interface StartSimulationAction extends Action<'StartSimulation'> {}

const startSimulation = (): StartSimulationAction => ({
    type: 'StartSimulation'
})

interface StopSimulationAction extends Action<'StopSimulation'> {}

const stopSimulation = (): StopSimulationAction => ({
    type: 'StopSimulation'
})

interface ResetSimulationAction extends Action<'ResetSimulation'> {
    type: 'ResetSimulation'
}

const resetSimulation = (): ResetSimulationAction => ({
    type: 'ResetSimulation'
})

interface IncrementSimulationStepAction extends Action<'IncrementSimulationStep'> {
    type: 'IncrementSimulationStep'
}

const incrementSimulationStep = (): IncrementSimulationStepAction => ({
    type: 'IncrementSimulationStep'
})

interface FinishSimulationAction extends Action<'FinishSimulation'> {
    type: 'FinishSimulation'
}

const finishSimulation = (): FinishSimulationAction => ({
    type: 'FinishSimulation'
})

export type SimulationActions = StartSimulationAction
    | StopSimulationAction
    | ResetSimulationAction
    | IncrementSimulationStepAction
    | FinishSimulationAction

export const simulationActionDispatcher = bindActionCreators(
    {
        startSimulation,
        stopSimulation,
        resetSimulation,
        incrementSimulationStep,
        finishSimulation
    },
    store.dispatch
)
