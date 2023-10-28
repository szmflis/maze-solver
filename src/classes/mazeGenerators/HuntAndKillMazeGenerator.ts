import { Direction } from '../../enums/Direction'
import { Coordinate } from '../../utils/Coordinate'
import { getNextCoordinate, getRandomDirectionFrom, removeWallsBetween } from '../../utils/MazeAlgosUtil'
import { CellState } from '../model/Cell'
import { Maze } from '../model/Maze'
import { MazeGenerator } from '../model/MazeGenerator'

export class HuntAndKillMazeGenerator implements MazeGenerator {
    private readonly simulationBoard: Maze
    private position: Coordinate
    private isAlgorithmFinished: boolean
    private indexPosition: Coordinate

    constructor (board: Maze, startingPosition: Coordinate) {
        this.simulationBoard = board
        this.position = startingPosition
        this.isAlgorithmFinished = false
        this.indexPosition = new Coordinate(0, 0)
    }

    public step (): Maze {
        this.generateNewBoard()
        return this.simulationBoard
    }

    public getIsAlgorithmFinished = () =>
        this.isAlgorithmFinished

    private generateNewBoard (): Maze {
        let newBoard = this.simulationBoard
        const unvisitedNeighboursList = this.getUnvisitedNeighbours()
        if (unvisitedNeighboursList.length !== 0) {
            const directionToCarveTo = getRandomDirectionFrom(unvisitedNeighboursList)
            const nextCoord = getNextCoordinate(this.position, directionToCarveTo)
            newBoard = removeWallsBetween(this.position, nextCoord, directionToCarveTo, newBoard)
            newBoard.setCellState(this.position, CellState.AIR)
            newBoard.setCellState(nextCoord, CellState.PLAYER)
            this.position = nextCoord
            return newBoard
        } else {
            this.moveToNextIndexCoordinate(newBoard)
        }
        return this.simulationBoard
    }

    private getUnvisitedNeighbours (): Direction[] {
        const neighbourList: Direction[] = []

        const rightNeighbour = this.simulationBoard.getBoardCellAt(this.position.x + 1, this.position.y)
        if (rightNeighbour !== null && rightNeighbour.getState() === CellState.UNVISITED) {
            neighbourList.push({ cell: rightNeighbour, direction: 'RIGHT' })
        }

        const leftNeighbour = this.simulationBoard.getBoardCellAt(this.position.x - 1, this.position.y)
        if (leftNeighbour !== null && leftNeighbour.getState() === CellState.UNVISITED) {
            neighbourList.push({ cell: leftNeighbour, direction: 'LEFT' })
        }

        const bottomNeighbour = this.simulationBoard.getBoardCellAt(this.position.x, this.position.y + 1)
        if (bottomNeighbour !== null && bottomNeighbour.getState() === CellState.UNVISITED) {
            neighbourList.push({ cell: bottomNeighbour, direction: 'BOTTOM' })
        }

        const topNeighbour = this.simulationBoard.getBoardCellAt(this.position.x, this.position.y - 1)
        if (topNeighbour !== null && topNeighbour.getState() === CellState.UNVISITED) {
            neighbourList.push({ cell: topNeighbour, direction: 'TOP' })
        }

        return neighbourList
    }

    private hasUnvisitedNeighbours (neighbours: Direction[]): boolean {
        return neighbours.some(neighbour => neighbour.cell !== null &&
            neighbour.cell.getState() === CellState.UNVISITED)
    }

    private getRandomNumberInRange (max: number): number {
        return Math.floor(Math.random() * max)
    }

    private moveToNextIndexCoordinate (maze: Maze) {
        maze.setCellState(this.position, CellState.AIR)
        const nextIndexCooridnate = this.getNextIndexCoordinate()
        this.indexPosition = nextIndexCooridnate
        this.position = nextIndexCooridnate
        maze.setCellState(nextIndexCooridnate, CellState.PLAYER)
    }

    private getNextIndexCoordinate (): Coordinate {
        if (this.indexPosition.x === this.simulationBoard.getBoardWidth() - 1 &&
        this.indexPosition.y === this.simulationBoard.getBoardHeight() - 1) {
            this.isAlgorithmFinished = true
        }

        if (this.indexPosition.x < this.simulationBoard.getBoardWidth() - 1) {
            return new Coordinate(this.indexPosition.x + 1, this.indexPosition.y)
        } else {
            return new Coordinate(0, this.indexPosition.y + 1)
        }
    }
}
