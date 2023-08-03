import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { DepthFirstSearchMazeGenerator } from '../classes/DepthFirstSearchMazeGenerator'
import { Coordinate } from '../utils/Coordinate'
import { useEffect, useState } from 'react'
import { MazeSolver } from '../classes/MazeSolver'
import { DepthFirstSearchMazeSolver } from '../classes/DepthFirstSearchMazeSolver'

export const useMazeSolvingService = () => {
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const boardState = useSelector((state: AppState) => state.boardReducer)

    const [mazeSolver, setMazeSolver] = useState<MazeSolver>(
        new DepthFirstSearchMazeSolver(boardState.board, new Coordinate(0, 0)))

    useEffect(() => {
        const entryCoordinate = new Coordinate(0, 0)
        setMazeSolver(new DepthFirstSearchMazeSolver(boardState.board, entryCoordinate))
    }, [boardState.board, simulationState.simulationMode])

    return mazeSolver
}
