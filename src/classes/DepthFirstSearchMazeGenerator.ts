import { Direction } from '../enums/Direction'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { Coordinate } from '../utils/Coordinate'
import { getRandomDirectionFrom } from '../utils/GeneratorUtils'
import { Board } from './Board'
import { CellState } from './Cell'
import { DepthFirstSearchTerminalLogger } from './DepthFirstSearchTerminalLogger'
import { MazeGenerator } from './MazeGenerator'

export class DepthFirstSearchMazeGenerator implements MazeGenerator {

    private readonly simulationBoard: Board
    private position: Coordinate
    private logger: DepthFirstSearchTerminalLogger

    constructor (board: Board, startingPosition: Coordinate) {
        this.simulationBoard = board
        this.position = startingPosition
        this.logger = new DepthFirstSearchTerminalLogger()
    }

    public step (): Board {
        this.logger = new DepthFirstSearchTerminalLogger()
        const newBoard = this.generateNewBoard(this.position)
        this.logger.commitStack()
        return newBoard
    }

    public generateNewBoard (fromCoord: Coordinate): Board {
        let newBoard = this.simulationBoard
        const allDirections = this.getAllDirections(fromCoord)
        this.logger.addSearchStep(allDirections, 'possible directions')
        const availableUnvisitedDirections = this.getUnvisitedDirecitons(allDirections)
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
        // boardActionDispatcher.setBoard(newBoard)
    }

    private finishGeneration () {
        console.log('generation finished')
        simulationActionDispatcher.finishSimulation()
        this.logger.addGenerationFinish()
    }

    private moveToUnvisitedDirection (
        fromCoord: Coordinate,
        availableUnvisitedDirections: Direction[],
        inputBoard: Board
    ): Board {
        const randomDirection = getRandomDirectionFrom(availableUnvisitedDirections)
        const nextCoord = this.getNextCoordinate(fromCoord, randomDirection)

        if (randomDirection.direction === 'LEFT') {
            inputBoard.removeLeftWall(this.position)
            inputBoard.removeRightWall(nextCoord)
        }

        if (randomDirection.direction === 'RIGHT') {
            inputBoard.removeRightWall(this.position)
            inputBoard.removeLeftWall(nextCoord)
        }

        if (randomDirection.direction === 'TOP') {
            inputBoard.removeTopWall(this.position)
            inputBoard.removeBottomWall(nextCoord)
        }

        if (randomDirection.direction === 'BOTTOM') {
            inputBoard.removeBottomWall(this.position)
            inputBoard.removeTopWall(nextCoord)
        }

        this.logger.addMoveStep(nextCoord)
        this.logger.addSetStep(this.position, 'VISITED')
        this.logger.addSetStep(nextCoord, 'PLAYER')
        inputBoard.setCellState(this.position, CellState.VISITED)
        inputBoard.setCellState(nextCoord, CellState.PLAYER)
        // setPosition(nextCoord)
        this.position = nextCoord
        return inputBoard
    }

    private moveBackToVisitedDirection (
        fromCoord: Coordinate,
        availableVisitedDirections: Direction[],
        inputBoard: Board
    ): Board {
        const currentCell = this.simulationBoard.getBoardCellAt(this.position.x, this.position.y)
        if (!currentCell) return inputBoard
        const randomChosenDirection = availableVisitedDirections[0]
        const randomChosenCell = randomChosenDirection.cell
        if (!randomChosenCell) return inputBoard

        const nextCoord = this.getNextCoordinate(fromCoord, randomChosenDirection)
        this.logger.addMoveStep(nextCoord)
        inputBoard.setCellState(this.position, CellState.AIR)
        this.logger.addSetStep(this.position, 'VISITED')
        inputBoard.setCellState(nextCoord, CellState.PLAYER)
        this.logger.addSetStep(nextCoord, 'PLAYER')
        // setPosition(nextCoord)
        this.position = nextCoord
        return inputBoard
    }

    private getNextCoordinate (fromCoord: Coordinate, direction: Direction) {
        switch (direction.direction) {
        case 'LEFT': return new Coordinate(fromCoord.x - 1, fromCoord.y)
        case 'BOTTOM': return new Coordinate(fromCoord.x, fromCoord.y + 1)
        case 'RIGHT': return new Coordinate(fromCoord.x + 1, fromCoord.y)
        case 'TOP': return new Coordinate(fromCoord.x, fromCoord.y - 1)
        }
    }

    private getAllDirections (forCoordinate: Coordinate): Direction[] {
        const left: Direction = {
            cell: this.simulationBoard.getBoardCellAt(forCoordinate.x - 1, forCoordinate.y),
            direction: 'LEFT'
        }
        const right: Direction = {
            cell: this.simulationBoard.getBoardCellAt(forCoordinate.x + 1, forCoordinate.y),
            direction: 'RIGHT'
        }
        const top: Direction = {
            cell: this.simulationBoard.getBoardCellAt(forCoordinate.x, forCoordinate.y - 1),
            direction: 'TOP'
        }
        const bottom: Direction = {
            cell: this.simulationBoard.getBoardCellAt(forCoordinate.x, forCoordinate.y + 1),
            direction: 'BOTTOM'
        }
        return [left, right, top, bottom]
    }

    private getUnvisitedDirecitons (directions: Direction[]): Direction[] {
        return directions.filter(
            dir => dir.cell !== null &&
            (dir.cell.getState() === CellState.UNVISITED))
    }

    private getVisitedDirections (directions: Direction[]): Direction[] {
        const adjecentVisitedDirecitons = directions.filter(
            dir => dir.cell !== null &&
            dir.cell.getState() !== CellState.AIR)

        return adjecentVisitedDirecitons.filter(dir => {
            const adjectentCell = dir.cell
            switch (dir.direction) {
            case 'LEFT': {
                if (adjectentCell) return !adjectentCell.getWalls()[1]
                break
            }
            case 'RIGHT': {
                if (adjectentCell) return !adjectentCell.getWalls()[3]
                break
            }
            case 'TOP': {
                if (adjectentCell) return !adjectentCell.getWalls()[2]
                break
            }
            case 'BOTTOM': {
                if (adjectentCell) return !adjectentCell.getWalls()[0]
                break
            }
            }
            return false
        })
    }
}
