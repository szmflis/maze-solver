import { Direction } from '../../enums/Direction'
import { Coordinate } from '../../utils/Coordinate'
import {
    getUnvisitedDirecitons,
    getVisitedDirections,
    getAllPossibleDirectionsFromCoord,
    getNextCoordinate,
    getUnwalledDirections,
    getRandomDirectionFrom,
    removeWallsBetween
} from '../../utils/MazeAlgosUtil'
import { CellState } from '../model/Cell'
import { Maze } from '../model/Maze'
import { MazeGenerator } from '../model/MazeGenerator'
import { DepthFirstSearchTerminalLogger } from './DepthFirstSearchTerminalLogger'

export class DepthFirstSearchMazeGenerator implements MazeGenerator {

    private readonly simulationBoard: Maze
    private position: Coordinate
    private logger: DepthFirstSearchTerminalLogger
    private isAlogrithmFinished: boolean

    constructor (board: Maze, startingPosition: Coordinate) {
        this.simulationBoard = board
        this.position = startingPosition
        this.logger = new DepthFirstSearchTerminalLogger()
        this.isAlogrithmFinished = false
    }

    public step (): Maze {
        this.logger = new DepthFirstSearchTerminalLogger()
        const newBoard = this.generateNewBoard(this.position)
        this.logger.commitStack()
        return newBoard
    }

    public getIsAlgorithmFinished = (): boolean =>
        this.isAlogrithmFinished

    private generateNewBoard (fromCoord: Coordinate): Maze {
        let newBoard = this.simulationBoard
        const allDirections = getAllPossibleDirectionsFromCoord(fromCoord, newBoard)
        this.logger.addSearchStep(allDirections, 'possible directions')
        const availableUnvisitedDirections = getUnvisitedDirecitons(allDirections)
        this.logger.addSearchStep(availableUnvisitedDirections, 'Unvisited directions')
        if (availableUnvisitedDirections.length === 0) {
            this.logger.addFoundNoUnvisited()
            const availableVisitedDirections = getUnwalledDirections(getVisitedDirections(allDirections))
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
        this.position = nextCoord
        return inputBoard
    }

    private readonly finishAlgorithm = (): void => {
        this.isAlogrithmFinished = true
    }

    private finishGeneration () {
        this.logger.addGenerationFinish()
        this.finishAlgorithm()
    }
}
