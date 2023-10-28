import { MazeGenerator } from '../classes/model/MazeGenerator'
import { Coordinate } from '../utils/Coordinate'
import { useEffect, useState } from 'react'
import { BinaryTreeMazeGenerator } from '../classes/mazeGenerators/BinaryTreeMazeGenerator'
import { DepthFirstSearchMazeGenerator } from '../classes/mazeGenerators/DepthFirstSearchMazeGenerator'
import { useBoardService } from './BoardService'
import { useSimulationService } from './SimulationService'
import { HuntAndKillMazeGenerator } from '../classes/mazeGenerators/HuntAndKillMazeGenerator'

export const useMazeGeneratingService = () => {
    const boardService = useBoardService()
    const simulationService = useSimulationService()

    const [mazeGen, setMazeGen] = useState<MazeGenerator>(
        new DepthFirstSearchMazeGenerator(boardService.getBoard(), new Coordinate(0, 0)))

    useEffect(() => {
        const entryCoordinate = new Coordinate(0, 0)
        switch (simulationService.getSimulationAlgorithm()) {
        case 'DEPTH_FIRST_SEARCH':
            setMazeGen(new DepthFirstSearchMazeGenerator(boardService.getBoard(), entryCoordinate))
            break
        case 'BINARY_TREE':
            setMazeGen(new BinaryTreeMazeGenerator(boardService.getBoard(), entryCoordinate))
            break
        case 'HUNT_AND_KILL':
            setMazeGen(new HuntAndKillMazeGenerator(boardService.getBoard(), entryCoordinate))
            break
        default:
            setMazeGen(new DepthFirstSearchMazeGenerator(boardService.getBoard(), entryCoordinate))
        }
    }, [boardService.getBoard(), simulationService.getSimulationAlgorithm()])

    return mazeGen
}
