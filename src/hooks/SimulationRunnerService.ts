import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BinaryTreeMazeGenerator } from '../classes/BinaryTreeMazeGenerator'
import { AppState } from '../store'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { Coordinate } from '../utils/Coordinate'
import { useInterval } from './useInterval'
import { MazeGenerator } from '../classes/MazeGenerator'
import { boardActionDispatcher } from '../store/board/actions'

export const useSimulationRunnerService = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const boardState = useSelector((state: AppState) => state.boardReducer)

    // const [mazeGen, setMazeGen] = useState<MazeGenerator>(
    //     new BinaryTreeMazeGenerator(boardState.board,new Coordinate(0, 0)))

    const [mazeGen, setMazeGen] = useState<MazeGenerator>(
        new BinaryTreeMazeGenerator(boardState.board, new Coordinate(0, 0)))

    useInterval(() => {
        step()
    }, simulationState.isRunning ? 10 : null)

    useEffect(() => {
        const entryCoordinate = new Coordinate(0, 0)
        setMazeGen(new BinaryTreeMazeGenerator(boardState.board, entryCoordinate))
    }, [boardState.board])

    const step = () => {
        if (simulationState.simulationStep === 0) {
            boardActionDispatcher.checkEntireBoard()
        }
        const board = mazeGen.step()
        boardActionDispatcher.setBoard(board)
        simulationActionDispatcher.incrementSimulationStep()
    }

    return { step }
}
export {}
