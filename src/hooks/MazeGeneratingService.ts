import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { MazeGenerator } from '../classes/model/MazeGenerator'
import { Coordinate } from '../utils/Coordinate'
import { useEffect, useState } from 'react'
import { BinaryTreeMazeGenerator } from '../classes/mazeGenerators/BinaryTreeMazeGenerator'
import { DepthFirstSearchMazeGenerator } from '../classes/mazeGenerators/DepthFirstSearchMazeGenerator'

export const useMazeGeneratingService = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const boardState = useSelector((state: AppState) => state.boardReducer)

    const [mazeGen, setMazeGen] = useState<MazeGenerator>(
        new DepthFirstSearchMazeGenerator(boardState.board, new Coordinate(0, 0)))

    useEffect(() => {
        const entryCoordinate = new Coordinate(0, 0)
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

    return mazeGen
}
