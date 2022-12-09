import { Direction } from '../enums/Direction'
import { Coordinate } from '../utils/Coordinate'
import { Board } from './Board'
import { Cell, CellState } from './Cell'

export class MazeGenerator {
    private readonly simulationBoard: Board
    private position: Coordinate

    constructor (board: Board) {
        this.simulationBoard = board
        this.simulationBoard.setCellState(new Coordinate(0, 0), CellState.PLAYER)
        this.position = new Coordinate(0, 0)
    }

    public step (): Board {
        this.getAvailableDirections(this.position)
        // console.log('Available directions for position ', this.position, ' are: ', availableDirections)
        // const randomDirection = this.getRandomDirection(availableDirections)
        // console.log('Selected random direciton is: ', randomDirection)
        // const nextCoordinate = this.getCoordinateFromDirection(randomDirection, this.position)
        // console.log('Next coordinate gonna be: ', nextCoordinate)
        // this.simulationBoard.setCellState(this.position, CellState.VISITED)
        // this.position = nextCoordinate
        // this.simulationBoard.setCellState(this.position, CellState.PLAYER)

        return this.simulationBoard
    }

    getAvailableDirections (fromCoord: Coordinate) {
        interface Direction {
            direction: 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'
            cell: Cell | null
        }

        const left: Direction = {
            cell: this.simulationBoard.getBoardCellAt(fromCoord.x - 1, fromCoord.y),
            direction: 'LEFT'
        }
        const right = {
            cell: this.simulationBoard.getBoardCellAt(fromCoord.x + 1, fromCoord.y),
            direction: 'RIGHT'
        }
        const top = {
            cell: this.simulationBoard.getBoardCellAt(fromCoord.x, fromCoord.y - 1),
            direction: 'TOP'
        }
        const bottom = {
            cell: this.simulationBoard.getBoardCellAt(fromCoord.x, fromCoord.y + 1),
            direction: 'BOTTOM'
        }

        const availableDirections = [left, right, top, bottom].filter(
            dir => dir.cell !== null && (dir.cell.getState() !== CellState.VISITED && dir.cell.getState() !== CellState.AIR && dir.cell.getState() !== CellState.PLAYER))

        if (availableDirections.length === 0) {
            const availableVisitedDirections = [left, right, top, bottom].filter(dir => dir.cell !== null && dir.cell.getState() !== CellState.AIR).filter(dir => {
                switch (dir.direction) {
                case 'LEFT': {
                    const cell = dir.cell
                    if (cell) {
                        if (!cell.getWalls()[1]) {
                            return true
                        } else {
                            return false
                        }
                    }
                    break
                }
                case 'RIGHT': {
                    const cell = dir.cell
                    if (cell) {
                        if (!cell.getWalls()[3]) {
                            return true
                        } else {
                            return false
                        }
                    }
                    break
                }
                case 'TOP': {
                    const cell = dir.cell
                    if (cell) {
                        if (!cell.getWalls()[2]) {
                            return true
                        } else {
                            return false
                        }
                    }
                    break
                }
                case 'BOTTOM': {
                    const cell = dir.cell
                    if (cell) {
                        if (!cell.getWalls()[0]) {
                            return true
                        } else {
                            return false
                        }
                    }
                    break
                }
                }
                return false
            })

            const currentCell = this.simulationBoard.getBoardCellAt(this.position.x, this.position.y)
            if (!currentCell) return
            const randomChosenDirection = availableVisitedDirections[0]
            switch (randomChosenDirection.direction) {
            case 'LEFT': {
                const cell = randomChosenDirection.cell
                if (cell) {
                    const nextCoord = new Coordinate(fromCoord.x - 1, fromCoord.y)
                    this.simulationBoard.setCellState(this.position, CellState.AIR)
                    this.position = nextCoord
                    this.simulationBoard.setCellState(this.position, CellState.PLAYER)
                    return false
                }
                break
            }
            case 'RIGHT': {
                const cell = randomChosenDirection.cell
                if (cell) {
                    const nextCoord = new Coordinate(fromCoord.x + 1, fromCoord.y)
                    this.simulationBoard.setCellState(this.position, CellState.AIR)
                    this.position = nextCoord
                    this.simulationBoard.setCellState(this.position, CellState.PLAYER)
                    return false
                }
                break
            }
            case 'TOP': {
                const cell = randomChosenDirection.cell
                if (cell) {
                    const nextCoord = new Coordinate(fromCoord.x, fromCoord.y - 1)
                    this.simulationBoard.setCellState(this.position, CellState.AIR)
                    this.position = nextCoord
                    this.simulationBoard.setCellState(this.position, CellState.PLAYER)
                    return false
                }
                break
            }
            case 'BOTTOM': {
                const cell = randomChosenDirection.cell
                if (cell) {
                    const nextCoord = new Coordinate(fromCoord.x, fromCoord.y + 1)
                    this.simulationBoard.setCellState(this.position, CellState.AIR)
                    this.position = nextCoord
                    this.simulationBoard.setCellState(this.position, CellState.PLAYER)
                    return false
                }
                break
            }
            }
        } else {
            const randomDirection = availableDirections[Math.floor(Math.random() * availableDirections.length)]
            if (randomDirection.direction === 'LEFT') {
                const nextCoord = new Coordinate(fromCoord.x - 1, fromCoord.y)
                this.simulationBoard.removeLeftWall(this.position)
                this.simulationBoard.removeRightWall(nextCoord)
                this.simulationBoard.setCellState(this.position, CellState.VISITED)
                this.position = nextCoord
                this.simulationBoard.setCellState(this.position, CellState.PLAYER)
            }

            if (randomDirection.direction === 'RIGHT') {
                const nextCoord = new Coordinate(fromCoord.x + 1, fromCoord.y)
                this.simulationBoard.removeRightWall(this.position)
                this.simulationBoard.removeLeftWall(nextCoord)
                this.simulationBoard.setCellState(this.position, CellState.VISITED)
                this.position = nextCoord
                this.simulationBoard.setCellState(this.position, CellState.PLAYER)
            }

            if (randomDirection.direction === 'TOP') {
                const nextCoord = new Coordinate(fromCoord.x, fromCoord.y - 1)
                this.simulationBoard.removeTopWall(this.position)
                this.simulationBoard.removeBottomWall(nextCoord)
                this.simulationBoard.setCellState(this.position, CellState.VISITED)
                this.position = nextCoord
                this.simulationBoard.setCellState(this.position, CellState.PLAYER)
            }

            if (randomDirection.direction === 'BOTTOM') {
                const nextCoord = new Coordinate(fromCoord.x, fromCoord.y + 1)
                this.simulationBoard.removeBottomWall(this.position)
                this.simulationBoard.removeTopWall(nextCoord)
                this.simulationBoard.setCellState(this.position, CellState.VISITED)
                this.position = nextCoord
                this.simulationBoard.setCellState(this.position, CellState.PLAYER)
            }
        }
    }

    getBoard (): Board {
        return this.simulationBoard
    }

    getRandomDirection (directions: Direction[]): Direction {
        const randomInt = Math.floor(Math.random() * Object.keys(directions).length)
        return Object.values(directions)[randomInt]
    }

    // getAvailableDirections (coordinate: Coordinate) {
    //     const directions = []
    //     if (this.isValidCoordinateToMoveTo(new Coordinate(coordinate.x - 1, coordinate.y))) {
    //         directions.push(Direction.LEFT)
    //     }
    //     if (this.isValidCoordinateToMoveTo(new Coordinate(coordinate.x + 1, coordinate.y))) {
    //         directions.push(Direction.RIGHT)
    //     }
    //     if (this.isValidCoordinateToMoveTo(new Coordinate(coordinate.x, coordinate.y + 1))) {
    //         directions.push(Direction.DOWN)
    //     }
    //     if (this.isValidCoordinateToMoveTo(new Coordinate(coordinate.x, coordinate.y - 1))) {
    //         directions.push(Direction.UP)
    //     }
    //     return directions
    // }

    // isValidCoordinateToMoveTo (coordinate: Coordinate): boolean {
    //     const stateOfCellAtCoordinate =
    //         this.board.getBoardStateAt(coordinate.x, coordinate.y)?.getState()
    //     if (stateOfCellAtCoordinate === null || stateOfCellAtCoordinate === undefined) return false
    //     switch (stateOfCellAtCoordinate) {
    //     // case CellState.AIR:
    //     //     return true
    //     // case CellState.VISITED:
    //     //     return false
    //     // case CellState.UNVISITED:
    //     //     return false
    //     default:
    //         throw new Error(`Reached unsupported CellState ${coordinate.x} , ${coordinate.y}`)
    //     }
    // }

    // wallOffCoordinate (coordinate: Coordinate) {
    //     const stateOfCoordinate = this.board.getBoardStateAt(coordinate.x, coordinate.y)?.getState()
    //     if (stateOfCoordinate !== CellState.VISITED) {
    //         this.board.setCellState(coordinate, CellState.WALL)
    //     }
    // }

    // getCoordinateFromDirection (dir: Direction, position: Coordinate): Coordinate {
    //     switch (dir) {
    //     case Direction.DOWN: {
    //         const coordinate = new Coordinate(position.x, position.y + 1)
    //         if (this.isValidCoordinateToMoveTo(coordinate)) {
    //             // this.wallOffCoordinate(new Coordinate(position.x - 1, position.y))
    //             // this.wallOffCoordinate(new Coordinate(position.x + 1, position.y))
    //             // this.wallOffCoordinate(new Coordinate(position.x, position.y - 1))
    //             return coordinate
    //         }
    //         break
    //     }
    //     case Direction.UP: {
    //         const coordinate = new Coordinate(position.x, position.y - 1)
    //         if (this.isValidCoordinateToMoveTo(coordinate)) {
    //             // this.wallOffCoordinate(new Coordinate(position.x - 1, position.y))
    //             // this.wallOffCoordinate(new Coordinate(position.x + 1, position.y))
    //             // this.wallOffCoordinate(new Coordinate(position.x, position.y + 1))
    //             return coordinate
    //         }
    //         break
    //     }
    //     case Direction.LEFT: {
    //         const coordinate = new Coordinate(position.x - 1, position.y)
    //         if (this.isValidCoordinateToMoveTo(coordinate)) {
    //             // this.wallOffCoordinate(new Coordinate(position.x, position.y + 1))
    //             // this.wallOffCoordinate(new Coordinate(position.x, position.y - 1))
    //             // this.wallOffCoordinate(new Coordinate(position.x + 1, position.y))
    //             return coordinate
    //         }
    //         break
    //     }
    //     case Direction.RIGHT: {
    //         const coordinate = new Coordinate(position.x + 1, position.y)
    //         if (this.isValidCoordinateToMoveTo(coordinate)) {
    //             // this.wallOffCoordinate(new Coordinate(position.x, position.y + 1))
    //             // this.wallOffCoordinate(new Coordinate(position.x, position.y - 1))
    //             // this.wallOffCoordinate(new Coordinate(position.x - 1, position.y))
    //             return coordinate
    //         }
    //         break
    //     }
    //     default:
    //         throw Error(`Reached unsupported direction ${dir}`)
    //     }
    //     throw Error(`Reached unsupported direction ${dir}`)
    // }
}
