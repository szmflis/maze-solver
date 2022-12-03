import { Direction } from '../enums/Direction'
import { Coordinate } from '../utils/Coordinate'
import { Board } from './Board'
import { Cell, CellState } from './Cell'

export class MazeGenerator {
    private readonly board: Board
    private position: Coordinate

    constructor (board: Board) {
        this.board = board
        this.board.setCellState(new Coordinate(0, 0), CellState.VISITED)
        this.position = new Coordinate(0, 0)
    }

    public step (): Board {
        const availableDirections = this.getAvailableDirections(this.position)
        console.log('Available directions for position ', this.position, ' are: ', availableDirections)
        const randomDirection = this.getRandomDirection(availableDirections)
        console.log('Selected random direciton is: ', randomDirection)
        const nextCoordinate = this.getCoordinateFromDirection(randomDirection, this.position)
        console.log('Next coordinate gonna be: ', nextCoordinate)
        this.board.setCellState(this.position, CellState.VISITED)
        this.position = nextCoordinate
        this.board.setCellState(this.position, CellState.PLAYER)

        return this.board
    }

    getBoard (): Board {
        return this.board
    }

    getRandomDirection (directions: Direction[]): Direction {
        const randomInt = Math.floor(Math.random() * Object.keys(directions).length)
        return Object.values(directions)[randomInt]
    }

    getAvailableDirections (coordinate: Coordinate) {
        const directions = []
        if (this.isValidCoordinateToMoveTo(new Coordinate(coordinate.x - 1, coordinate.y))) {
            directions.push(Direction.LEFT)
        }
        if (this.isValidCoordinateToMoveTo(new Coordinate(coordinate.x + 1, coordinate.y))) {
            directions.push(Direction.RIGHT)
        }
        if (this.isValidCoordinateToMoveTo(new Coordinate(coordinate.x, coordinate.y + 1))) {
            directions.push(Direction.DOWN)
        }
        if (this.isValidCoordinateToMoveTo(new Coordinate(coordinate.x, coordinate.y - 1))) {
            directions.push(Direction.UP)
        }
        return directions
    }

    isValidCoordinateToMoveTo (coordinate: Coordinate): boolean {
        const stateOfCellAtCoordinate =
            this.board.getBoardStateAt(coordinate.x, coordinate.y)?.getState()
        if (stateOfCellAtCoordinate === null || stateOfCellAtCoordinate === undefined) return false
        switch (stateOfCellAtCoordinate) {
        case CellState.AIR:
            return true
        case CellState.UNVISITED:
            return true
        case CellState.VISITED:
            return false
        case CellState.WALL:
            return false
        default:
            throw new Error(`Reached unsupported CellState ${coordinate.x} , ${coordinate.y}`)
        }
    }

    wallOffCoordinate (coordinate: Coordinate) {
        const stateOfCoordinate = this.board.getBoardStateAt(coordinate.x, coordinate.y)?.getState()
        if (stateOfCoordinate !== CellState.VISITED) {
            this.board.setCellState(coordinate, CellState.WALL)
        }
    }

    getCoordinateFromDirection (dir: Direction, position: Coordinate): Coordinate {
        switch (dir) {
        case Direction.DOWN: {
            const coordinate = new Coordinate(position.x, position.y + 1)
            if (this.isValidCoordinateToMoveTo(coordinate)) {
                this.wallOffCoordinate(new Coordinate(position.x - 1, position.y))
                this.wallOffCoordinate(new Coordinate(position.x + 1, position.y))
                this.wallOffCoordinate(new Coordinate(position.x, position.y - 1))
                return coordinate
            }
            break
        }
        case Direction.UP: {
            const coordinate = new Coordinate(position.x, position.y - 1)
            if (this.isValidCoordinateToMoveTo(coordinate)) {
                this.wallOffCoordinate(new Coordinate(position.x - 1, position.y))
                this.wallOffCoordinate(new Coordinate(position.x + 1, position.y))
                this.wallOffCoordinate(new Coordinate(position.x, position.y + 1))
                return coordinate
            }
            break
        }
        case Direction.LEFT: {
            const coordinate = new Coordinate(position.x - 1, position.y)
            if (this.isValidCoordinateToMoveTo(coordinate)) {
                this.wallOffCoordinate(new Coordinate(position.x, position.y + 1))
                this.wallOffCoordinate(new Coordinate(position.x, position.y - 1))
                this.wallOffCoordinate(new Coordinate(position.x + 1, position.y))
                return coordinate
            }
            break
        }
        case Direction.RIGHT: {
            const coordinate = new Coordinate(position.x + 1, position.y)
            if (this.isValidCoordinateToMoveTo(coordinate)) {
                this.wallOffCoordinate(new Coordinate(position.x, position.y + 1))
                this.wallOffCoordinate(new Coordinate(position.x, position.y - 1))
                this.wallOffCoordinate(new Coordinate(position.x - 1, position.y))
                return coordinate
            }
            break
        }
        default:
            throw Error(`Reached unsupported direction ${dir}`)
        }
        throw Error(`Reached unsupported direction ${dir}`)
    }
}
