import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { boardActionDispatcher } from '../store/board/actions'
import { Coordinate } from '../utils/Coordinate'
import { CellState } from '../classes/model/Cell'
import { Maze } from '../classes/model/Maze'

export const useBoardService = () => {
    const boardState = useSelector((state: AppState) => state.boardReducer)

    const getBoardWidth = () => boardState.boardWidth

    const getBoardHeight = () => boardState.boardHeight

    const getBoard = () => boardState.board

    const setBoardWidth = (newWidth: number): void => {
        boardActionDispatcher.changeBoardWidth(newWidth)
        unvisitEntireBoard()
        boardActionDispatcher.setBoardCellState(
            new Coordinate(newWidth - 1, getBoardHeight() - 1),
            CellState.EXIT)
        boardActionDispatcher.setBoardCellState(
            new Coordinate(0, 0),
            CellState.PLAYER)
    }

    const setBoardHeight = (newHeight: number): void => {
        boardActionDispatcher.changeBoardHeight(newHeight)
        unvisitEntireBoard()
        boardActionDispatcher.setBoardCellState(
            new Coordinate(getBoardWidth() - 1, newHeight - 1),
            CellState.EXIT)
        boardActionDispatcher.setBoardCellState(
            new Coordinate(0, 0),
            CellState.PLAYER)
    }

    const resetBoard = () =>
        boardActionDispatcher.resetBoard()

    const unvisitEntireBoard = () =>
        boardActionDispatcher.unvisitEntireBoard()

    const unvisitBoardWithEntryAndExit = () => {
        unvisitEntireBoard()
        boardActionDispatcher.setBoardCellState(
            new Coordinate(boardState.boardWidth - 1, boardState.boardHeight - 1),
            CellState.EXIT)
        boardActionDispatcher.setBoardCellState(new Coordinate(0, 0), CellState.PLAYER)
    }

    const setBoardStartingPoints = (
        newYStartPoints: Coordinate[],
        newXStartPoints: Coordinate[]
    ) => {
        boardActionDispatcher.setStartingCoordinates(newYStartPoints, newXStartPoints)
    }

    const getBoardWidthInPx = () => {
        return boardState.board.getBoardWidthInPx()
    }

    const getBoardHeightInPx = () => {
        return boardState.board.getBoardHeightInPx()
    }

    const setBoard = (newBoard: Maze) => {
        boardActionDispatcher.setBoard(newBoard)
    }

    const setBoardCellState = (coordinate: Coordinate, cellState: CellState) => {
        boardActionDispatcher.setBoardCellState(coordinate, cellState)
    }

    return {
        getBoardWidth,
        getBoardHeight,
        setBoardWidth,
        setBoardHeight,
        getBoard,
        setBoard,
        resetBoard,
        unvisitBoardWithEntryAndExit,
        setBoardStartingPoints,
        getBoardWidthInPx,
        getBoardHeightInPx,
        setBoardCellState,
        unvisitEntireBoard
    }
}
