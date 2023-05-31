import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { Coordinate } from '../utils/Coordinate'
import { useInterval } from './useInterval'
import { MazeGenerator } from '../classes/MazeGenerator'
import { boardActionDispatcher } from '../store/board/actions'
import { DepthFirstSearchMazeGenerator } from '../classes/DepthFirstSearchMazeGenerator'
import { BinaryTreeMazeGenerator } from '../classes/BinaryTreeMazeGenerator'

export const useSimulationRunnerService = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const boardState = useSelector((state: AppState) => state.boardReducer)

    const [mazeGen, setMazeGen] = useState<MazeGenerator>(
        new DepthFirstSearchMazeGenerator(boardState.board, new Coordinate(0, 0)))

    useInterval(() => {
        step()
    }, simulationState.isRunning ? simulationState.simulationSpeed : null)

    useEffect(() => {
        console.log('Setting algorithm')
        const entryCoordinate = new Coordinate(0, 0)
        setMazeGen(new DepthFirstSearchMazeGenerator(boardState.board, entryCoordinate))
        switch (simulationState.mazeGenerationAlgorithm) {
        case 'DEPTH_FIRST_SEARCH':
            setMazeGen(new DepthFirstSearchMazeGenerator(boardState.board, entryCoordinate))
            break
        case 'BINARY_TREE':
            setMazeGen(new BinaryTreeMazeGenerator(boardState.board, entryCoordinate))
            break
        default:
            setMazeGen(new DepthFirstSearchMazeGenerator(boardState.board, entryCoordinate))
        }
    }, [boardState.board, simulationState.mazeGenerationAlgorithm])

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
