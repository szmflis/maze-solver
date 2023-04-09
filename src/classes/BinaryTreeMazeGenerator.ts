import { Direction } from '../enums/Direction'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { Coordinate } from '../utils/Coordinate'
import { BinaryTreeTerminalLogger } from './BinaryTreeTerminalLogger'
import { Board } from './Board'
import { MazeGenerator } from './MazeGenerator'

export class BinaryTreeMazeGenerator implements MazeGenerator {
    private readonly simulationBoard: Board
    private position: Coordinate
    private logger: BinaryTreeTerminalLogger

    constructor (board: Board, startingPosition: Coordinate) {
        this.simulationBoard = board
        this.position = startingPosition
        this.logger = new BinaryTreeTerminalLogger()
    }

    public step (): Board {
        this.logger = new BinaryTreeTerminalLogger()
        this.generateNewBoard()
        this.logger.commitStack()
        return this.simulationBoard
    }

    generateNewBoard () {
        const availableDirections: Direction[] = this.getDirections(this.position)
        this.logger.addMoveStep(this.position)
        const randomDirection = this.getRandomDirection(availableDirections)
        if (randomDirection.direction === 'LEFT' && randomDirection.cell !== null) {
            const coordToTheLeft = new Coordinate(this.position.x - 1, this.position.y)
            this.simulationBoard.removeRightWall(coordToTheLeft)
            this.simulationBoard.removeLeftWall(this.position)
        }
        if (randomDirection.direction === 'TOP' && randomDirection.cell !== null) {
            const coordToTheTop = new Coordinate(this.position.x, this.position.y - 1)
            this.simulationBoard.removeBottomWall(coordToTheTop)
            this.simulationBoard.removeTopWall(this.position)
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
    }

    getDirections (forCoordinate: Coordinate): Direction[] {
        const left: Direction = {
            cell: this.simulationBoard.getBoardCellAt(forCoordinate.x - 1, forCoordinate.y),
            direction: 'LEFT'
        }
        const top: Direction = {
            cell: this.simulationBoard.getBoardCellAt(forCoordinate.x, forCoordinate.y - 1),
            direction: 'TOP'
        }
        return [left, top]
    }

    getRandomDirection (directions: Direction[]): Direction {
        const randomInt = Math.floor(Math.random() * Object.keys(directions).length)
        return Object.values(directions)[randomInt]
    }

    finishGeneration () {
        console.log('generation finished')
        simulationActionDispatcher.finishSimulation()
    }
}
