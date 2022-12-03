import { Action, bindActionCreators } from 'redux'
import store from '..'
import { Board } from '../../classes/Board'
import { Cell } from '../../classes/Cell'
import { Coordinate } from '../../utils/Coordinate'

interface ChangeBoardWidthAction extends Action<'ChangeBoardWidth'> {
    newWidth: number
}

interface ChangeBoardHeightAction extends Action<'ChangeBoardHeight'> {
    newHeight: number
}

interface CheckBoardCellStateAction extends Action<'CheckBoardCellState'> {
    coordinate: Coordinate
}

interface UncheckBoardCellStateAction extends Action<'UncheckBoardCellState'> {
    coordinate: Coordinate
}

interface SetBoardStartPointsAction extends Action<'SetBoardStartPoints'> {
    rowPoints: Coordinate[]
    columnPoints: Coordinate[]
}

interface StartSimulationAction extends Action<'StartSimulation'> {}

interface StopSimulationAction extends Action<'StopSimulation'> {}

const changeBoardWidth = (newWidth: number): ChangeBoardWidthAction => ({
    type: 'ChangeBoardWidth',
    newWidth
})

const changeBoardHeight = (newHeight: number): ChangeBoardHeightAction => ({
    type: 'ChangeBoardHeight',
    newHeight
})

const checkBoardCellState = (coordinate: Coordinate): CheckBoardCellStateAction => ({
    type: 'CheckBoardCellState',
    coordinate
})

const uncheckBoardCellState = (coordinate: Coordinate): UncheckBoardCellStateAction => ({
    type: 'UncheckBoardCellState',
    coordinate
})

const startSimulation = (): StartSimulationAction => ({
    type: 'StartSimulation'
})

const stopSimulation = (): StopSimulationAction => ({
    type: 'StopSimulation'
})

const setStartingCoordinates = (
    rowPoints: Coordinate[], columnPoints: Coordinate[]
): SetBoardStartPointsAction => ({
    type: 'SetBoardStartPoints',
    rowPoints,
    columnPoints
})

export type SimulationActions = ChangeBoardHeightAction
    | ChangeBoardWidthAction
    | CheckBoardCellStateAction
    | UncheckBoardCellStateAction
    | StartSimulationAction
    | StopSimulationAction
    | SetBoardStartPointsAction

export const simulationActionDispatcher = bindActionCreators(
    {
        changeBoardWidth,
        changeBoardHeight,
        checkBoardCellState,
        uncheckBoardCellState,
        startSimulation,
        stopSimulation,
        setStartingCoordinates
    },
    store.dispatch
)
