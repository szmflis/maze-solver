import { Direction } from '../../enums/Direction'
import { simulationActionDispatcher } from '../../store/simulation/actions'
import { Coordinate } from '../../utils/Coordinate'
import {
    getUnvisitedDirecitons,
    getVisitedDirections,
    getAllPossibleDirectionsFromCoord,
    getNextCoordinate,
    getUnwalledDirections,
    getRandomDirectionFrom
} from '../../utils/MazeAlgosUtil'
import { CellState } from '../model/Cell'
import { Maze } from '../model/Maze'
import { MazeSolver } from '../model/MazeSolver'

export class DepthFirstSearchMazeSolver implements MazeSolver {

    private readonly simulationMaze: Maze
    private position: Coordinate

    constructor (maze: Maze, startingPosition: Coordinate) {
        this.simulationMaze = maze
        this.position = startingPosition
    }

    public step (): Maze {
        return this.generateNewMaze(this.position)
    }

    private generateNewMaze (fromCoord: Coordinate): Maze {
        const newMaze = this.simulationMaze
        const allDirections = getAllPossibleDirectionsFromCoord(fromCoord, newMaze)
        const availableUnwalledDirections = getUnwalledDirections(allDirections)
        const exitOnes = availableUnwalledDirections.filter(d => d.cell?.getState() === CellState.EXIT)
        if (exitOnes.length !== 0) {
            this.finishGeneration()
            newMaze.setCellState(this.position, CellState.VISITED)
            return newMaze
        } else {
            const availableUnvisitedDirections = getUnvisitedDirecitons(availableUnwalledDirections)
            if (availableUnvisitedDirections.length === 0) {
                const adjecentVisitedDirections = getVisitedDirections(availableUnwalledDirections)
                this.moveBackToVisitedDirection(fromCoord, adjecentVisitedDirections, newMaze)
            } else {
                this.moveToUnvisitedDirection(fromCoord, availableUnvisitedDirections, newMaze)
            }
        }
        return newMaze
    }

    private finishGeneration () {
        console.log('Generation finished!')
        simulationActionDispatcher.finishSimulation()
    }

    private moveToUnvisitedDirection (
        fromCoord: Coordinate,
        availableUnvisitedDirections: Direction[],
        inputBoard: Maze
    ): Maze {
        const randomDirection = getRandomDirectionFrom(availableUnvisitedDirections)
        const nextCoord = getNextCoordinate(fromCoord, randomDirection)
        inputBoard.setCellState(this.position, CellState.VISITED)
        inputBoard.setCellState(nextCoord, CellState.PLAYER)
        this.position = nextCoord
        return inputBoard
    }

    private moveBackToVisitedDirection (
        fromCoord: Coordinate,
        availableVisitedDirections: Direction[],
        inputBoard: Maze
    ): Maze {
        const currentCell = inputBoard.getBoardCellAt(this.position.x, this.position.y)
        if (!currentCell) return inputBoard
        const randomChosenDirection = availableVisitedDirections[0]
        const randomChosenCell = randomChosenDirection.cell
        if (!randomChosenCell) return inputBoard

        const nextCoord = getNextCoordinate(fromCoord, randomChosenDirection)
        inputBoard.setCellState(this.position, CellState.AIR)
        inputBoard.setCellState(nextCoord, CellState.PLAYER)
        this.position = nextCoord
        return inputBoard
    }
}
