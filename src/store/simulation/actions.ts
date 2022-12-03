import { Action, bindActionCreators } from 'redux'
import store from '..'
import { Board } from '../../classes/Board'
import { Cell } from '../../classes/Cell'
import { Coordinate } from '../../utils/Coordinate'

interface ChangeBoardWidthAction extends Action<'ChangeBoardWidth'> {
    newWidth: number
}

const changeBoardWidth = (newWidth: number): ChangeBoardWidthAction => ({
    type: 'ChangeBoardWidth',
    newWidth
})

interface ChangeBoardHeightAction extends Action<'ChangeBoardHeight'> {
    newHeight: number
}

const changeBoardHeight = (newHeight: number): ChangeBoardHeightAction => ({
    type: 'ChangeBoardHeight',
    newHeight
})

interface CheckBoardCellStateAction extends Action<'CheckBoardCellState'> {
    coordinate: Coordinate
}

const checkBoardCellState = (coordinate: Coordinate): CheckBoardCellStateAction => ({
    type: 'CheckBoardCellState',
    coordinate
})

interface UncheckBoardCellStateAction extends Action<'UncheckBoardCellState'> {
    coordinate: Coordinate
}

const uncheckBoardCellState = (coordinate: Coordinate): UncheckBoardCellStateAction => ({
    type: 'UncheckBoardCellState',
    coordinate
})

interface SetBoardStartPointsAction extends Action<'SetBoardStartPoints'> {
    rowPoints: Coordinate[]
    columnPoints: Coordinate[]
}

const setStartingCoordinates = (
    rowPoints: Coordinate[], columnPoints: Coordinate[]
): SetBoardStartPointsAction => ({
    type: 'SetBoardStartPoints',
    rowPoints,
    columnPoints
})

interface StartSimulationAction extends Action<'StartSimulation'> {}

const startSimulation = (): StartSimulationAction => ({
    type: 'StartSimulation'
})

interface StopSimulationAction extends Action<'StopSimulation'> {}

const stopSimulation = (): StopSimulationAction => ({
    type: 'StopSimulation'
})

interface UnvisitEntireBoardAction extends Action<'UnvisitEntireBoard'> {}

const checkEntireBoard = (): UnvisitEntireBoardAction => ({
    type: 'UnvisitEntireBoard'
})

interface SetBoardAction extends Action<'SetBoard'> {
    board: Board
}

const setBoard = (board: Board): SetBoardAction => ({
    type: 'SetBoard',
    board
})

export type SimulationActions = ChangeBoardHeightAction
    | ChangeBoardWidthAction
    | CheckBoardCellStateAction
    | UncheckBoardCellStateAction
    | StartSimulationAction
    | StopSimulationAction
    | SetBoardStartPointsAction
    | UnvisitEntireBoardAction
    | SetBoardAction

export const simulationActionDispatcher = bindActionCreators(
    {
        changeBoardWidth,
        changeBoardHeight,
        checkBoardCellState,
        uncheckBoardCellState,
        startSimulation,
        stopSimulation,
        setStartingCoordinates,
        checkEntireBoard,
        setBoard
    },
    store.dispatch
)
