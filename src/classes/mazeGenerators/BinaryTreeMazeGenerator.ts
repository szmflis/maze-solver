import { Direction } from '../../enums/Direction'
import { simulationActionDispatcher } from '../../store/simulation/actions'
import { Coordinate } from '../../utils/Coordinate'
import { BinaryTreeTerminalLogger } from './BinaryTreeTerminalLogger'
import { MazeGenerator } from '../model/MazeGenerator'
import { Maze } from '../model/Maze'
import { CellState } from '../model/Cell'

export class BinaryTreeMazeGenerator implements MazeGenerator {
    private readonly simulationBoard: Maze
    private position: Coordinate
    private logger: BinaryTreeTerminalLogger

    constructor (board: Maze, startingPosition: Coordinate) {
        this.simulationBoard = board
        this.position = startingPosition
        this.logger = new BinaryTreeTerminalLogger()
    }

    public getIsAlgorithmFinished = () => false

    public step (): Maze {
        this.logger = new BinaryTreeTerminalLogger()
        this.generateNewBoard()
        this.logger.commitStack()
        return this.simulationBoard
    }

    generateNewBoard () {
        this.simulationBoard.setCellState(this.position, CellState.VISITED)
        const availableDirections: Direction[] = this.getDirections(this.position)
        const randomDirection = this.getRandomDirection(availableDirections)
        if (randomDirection.direction === 'RIGHT' && randomDirection.cell !== null) {
            const coordToTheRight = new Coordinate(this.position.x + 1, this.position.y)
            this.simulationBoard.removeLeftWall(coordToTheRight)
            this.simulationBoard.removeRightWall(this.position)
            this.logger.removingWallStep(this.position, randomDirection)
        }
        if (randomDirection.direction === 'BOTTOM' && randomDirection.cell !== null) {
            const coordToTheBottom = new Coordinate(this.position.x, this.position.y + 1)
            this.simulationBoard.removeTopWall(coordToTheBottom)
            this.simulationBoard.removeBottomWall(this.position)
            this.logger.removingWallStep(this.position, randomDirection)
        }
        this.setNewPosition()
        return this.simulationBoard
    }

    setNewPosition () {
        if (this.position.x === this.simulationBoard.getBoardWidth() - 1 &&
            this.position.y === this.simulationBoard.getBoardHeight() - 1) {
            this.finishGeneration()
        }
        if (this.position.x === this.simulationBoard.getBoardWidth() - 1) {
            this.position = new Coordinate(0, this.position.y + 1)
        } else {
            this.position = new Coordinate(this.position.x + 1, this.position.y)
        }
        this.simulationBoard.setCellState(this.position, CellState.PLAYER)
        this.logger.movedToStep(this.position)
    }

    getDirections (forCoordinate: Coordinate): Direction[] {
        const right: Direction = {
            cell: this.simulationBoard.getBoardCellAt(forCoordinate.x + 1, forCoordinate.y),
            direction: 'RIGHT'
        }
        const bottom: Direction = {
            cell: this.simulationBoard.getBoardCellAt(forCoordinate.x, forCoordinate.y + 1),
            direction: 'BOTTOM'
        }
        return [right, bottom]
    }

    getRandomDirection (directions: Direction[]): Direction {
        const randomInt = Math.floor(Math.random() * Object.keys(directions).length)
        return Object.values(directions)[randomInt]
    }

    finishGeneration () {
        simulationActionDispatcher.finishSimulation()
        this.logger.addGenerationFinish()
    }
}
