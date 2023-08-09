import { Coordinate } from '../utils/Coordinate'
import { useEffect, useState } from 'react'
import { DepthFirstSearchMazeSolver } from '../classes/mazeSolvers/DepthFirstSearchMazeSolver'
import { MazeSolver } from '../classes/model/MazeSolver'
import { useSimulationService } from './SimulationService'
import { useBoardService } from './BoardService'

export const useMazeSolvingService = () => {
    const simulationService = useSimulationService()
    const boardService = useBoardService()

    const [mazeSolver, setMazeSolver] = useState<MazeSolver>(
        new DepthFirstSearchMazeSolver(boardService.getBoard(), new Coordinate(0, 0)))

    useEffect(() => {
        const entryCoordinate = new Coordinate(0, 0)
        setMazeSolver(new DepthFirstSearchMazeSolver(boardService.getBoard(), entryCoordinate))
    }, [boardService.getBoard(), simulationService.getSimulationMode()])

    return mazeSolver
}
