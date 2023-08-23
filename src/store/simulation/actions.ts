import { Action, bindActionCreators } from 'redux'
import store from '..'
import { SimulationMode, Algorithm } from './types'

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

interface SetSelectedAlgorithmAction extends Action<'SetSelectedAlgorithm'> {
    type: 'SetSelectedAlgorithm'
    algorithm: Algorithm
}

const setMazeGeneratingAlogrithm = (algorithm: Algorithm): SetSelectedAlgorithmAction => ({
    type: 'SetSelectedAlgorithm',
    algorithm
})

interface SetSimulationSpeedAction extends Action<'SetSimulationSpeed'> {
    type: 'SetSimulationSpeed'
    newSpeed: number
}

const setSimulationSpeed = (newSpeed: number): SetSimulationSpeedAction => ({
    type: 'SetSimulationSpeed',
    newSpeed
})

interface SetSimulationModeAction extends Action<'SetSimulationMode'> {
    type: 'SetSimulationMode'
    simMode: SimulationMode
}

const setSimulationModeAlogrithm = (simMode: SimulationMode): SetSimulationModeAction => ({
    type: 'SetSimulationMode',
    simMode
})

interface SetFinishedSimulationAction extends Action<'SetFinishedSimulation'> {
    type: 'SetFinishedSimulation'
    isFinished: boolean
}

const setSimulationFinished = (isFinished: boolean): SetFinishedSimulationAction => ({
    type: 'SetFinishedSimulation',
    isFinished
})

export type SimulationActions = StartSimulationAction
    | StopSimulationAction
    | ResetSimulationAction
    | IncrementSimulationStepAction
    | FinishSimulationAction
    | SetSelectedAlgorithmAction
    | SetSimulationSpeedAction
    | SetSimulationModeAction
    | SetFinishedSimulationAction

export const simulationActionDispatcher = bindActionCreators(
    {
        startSimulation,
        stopSimulation,
        resetSimulation,
        incrementSimulationStep,
        finishSimulation,
        setMazeGeneratingAlogrithm,
        setSimulationSpeed,
        setSimulationModeAlogrithm,
        setSimulationFinished
    },
    store.dispatch
)
