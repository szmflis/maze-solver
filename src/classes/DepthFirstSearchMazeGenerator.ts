import { Direction } from '../enums/Direction'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { Coordinate } from '../utils/Coordinate'
import { Maze } from './Maze'
import { CellState } from './Cell'
import { DepthFirstSearchTerminalLogger } from './DepthFirstSearchTerminalLogger'
import { MazeGenerator } from './MazeGenerator'
import {
    getAllPossibleDirectionsFromCoord,
    getAdjecentUnvisitedDirecitons,
    getAdjecentVisitedDirections,
    getPossibleUnwalledDirections,
    getRandomDirectionFrom,
    removeWallsBetween,
    getNextCoordinate
} from './MazeAlgosUtil'
import { boardActionDispatcher } from '../store/board/actions'

export class DepthFirstSearchMazeGenerator implements MazeGenerator {

    private readonly simulationBoard: Maze
    private position: Coordinate
    private logger: DepthFirstSearchTerminalLogger

    constructor (board: Maze, startingPosition: Coordinate) {
        this.simulationBoard = board
        this.position = startingPosition
        this.logger = new DepthFirstSearchTerminalLogger()
    }

    public step (): Maze {
        this.logger = new DepthFirstSearchTerminalLogger()
        const newBoard = this.generateNewBoard(this.position)
        this.logger.commitStack()
        return newBoard
    }

    public generateNewBoard (fromCoord: Coordinate): Maze {
        let newBoard = this.simulationBoard
        const allDirections = getAllPossibleDirectionsFromCoord(fromCoord, newBoard)
        this.logger.addSearchStep(allDirections, 'possible directions')
        const availableUnvisitedDirections = getAdjecentUnvisitedDirecitons(allDirections)
        this.logger.addSearchStep(availableUnvisitedDirections, 'Unvisited directions')
        if (availableUnvisitedDirections.length === 0) {
            this.logger.addFoundNoUnvisited()
            const availableVisitedDirections = this.getVisitedDirections(allDirections)
            this.logger.addSearchStep(availableVisitedDirections, 'visited directions')
            if (availableVisitedDirections.length === 0) {
                this.finishGeneration()
            } else {
                newBoard = this.moveBackToVisitedDirection(fromCoord, availableVisitedDirections, newBoard)
            }
        } else {
            newBoard = this.moveToUnvisitedDirection(fromCoord, availableUnvisitedDirections, newBoard)
        }
        return newBoard
    }

    private finishGeneration () {
        console.log('generation finished')
        simulationActionDispatcher.finishSimulation()
        this.logger.addGenerationFinish()
        boardActionDispatcher.setBoardCellState(new Coordinate(
            this.simulationBoard.getBoardHeight() - 1, this.simulationBoard.getBoardWidth() - 1
        ), CellState.EXIT)
    }

    private moveToUnvisitedDirection (
        fromCoord: Coordinate,
        availableUnvisitedDirections: Direction[],
        inputBoard: Maze
    ): Maze {
        const randomDirection = getRandomDirectionFrom(availableUnvisitedDirections)
        const nextCoord = getNextCoordinate(fromCoord, randomDirection)
        inputBoard = removeWallsBetween(this.position, nextCoord, randomDirection, inputBoard)
        this.logger.addMoveStep(nextCoord)
        this.logger.addSetStep(this.position, 'VISITED')
        this.logger.addSetStep(nextCoord, 'PLAYER')
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
        const currentCell = this.simulationBoard.getBoardCellAt(this.position.x, this.position.y)
        if (!currentCell) return inputBoard
        const randomChosenDirection = availableVisitedDirections[0]
        const randomChosenCell = randomChosenDirection.cell
        if (!randomChosenCell) return inputBoard

        const nextCoord = getNextCoordinate(fromCoord, randomChosenDirection)
        this.logger.addMoveStep(nextCoord)
        inputBoard.setCellState(this.position, CellState.AIR)
        this.logger.addSetStep(this.position, 'VISITED')
        inputBoard.setCellState(nextCoord, CellState.PLAYER)
        this.logger.addSetStep(nextCoord, 'PLAYER')
        // setPosition(nextCoord)
        this.position = nextCoord
        return inputBoard
    }

    private getVisitedDirections (directions: Direction[]): Direction[] {
        const adjecentVisitedDirecitons = getAdjecentVisitedDirections(directions)
        return getPossibleUnwalledDirections(adjecentVisitedDirecitons)
    }
}
