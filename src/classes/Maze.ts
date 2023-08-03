import { Direction } from '../enums/Direction'
import { Coordinate } from '../utils/Coordinate'
import { Cell, CellState } from './Cell'

export class Maze {
    private board: Cell[][]

    constructor (width: number, height: number, board?: Cell[][]) {
        if (board != null) {
            this.board = board
        } else {
            const newBoard: Cell[][] = []
            for (let y = 0; y < height; y++) {
                const row: Cell[] = []
                for (let x = 0; x < width; x++) {
                    row.push(new Cell(CellState.UNVISITED))
                }
                newBoard.push(row)
            }
            this.board = newBoard
        }
    }

    setBoard (board: Maze) {
        this.board = board.board
    }

    getBoardWidth (): number {
        return this.board[0].length
    }

    getBoardHeight (): number {
        return this.board.length
    }

    getBoard (): Cell[][] {
        return this.board
    }

    setBoardDimenstions (newHeight: number, newWidth: number): void {
        const newBoard: Cell[][] = []
        for (let y = 0; y < newHeight; y++) {
            const row: Cell[] = []
            for (let x = 0; x < newWidth; x++) {
                const existingState = this.getBoardCellAt(x, y)
                if (existingState != null) {
                    row.push(existingState)
                } else {
                    row.push(new Cell(CellState.UNVISITED))
                }
            }
            newBoard.push(row)
        }
        this.board = newBoard
    }

    setCellState (coordinate: Coordinate, state: CellState, debug?: boolean): void {
        if (coordinate.y > this.getBoardHeight() || coordinate.y < 0) {
            console.log('setCellState() ', coordinate.y, ' outside of board height ', this.board.length)
            return
        }
        if (coordinate.x > this.getBoardWidth() || coordinate.x < 0) {
            console.log('setCellState() ', coordinate.x, ' outside of board width ', this.board[0].length)
            return
        }
        this.board[coordinate.y][coordinate.x].setState(state)
    }

    getBoardCellAt (x: number, y: number): Cell | null {
        if ((x < this.getBoardWidth() && x >= 0) && (y < this.getBoardHeight() && y >= 0)) {
            return this.board[y][x]
        } else {
            return null
        }
    }

    setStartingCoordinate (height: number, width: number, coordinate: Coordinate): void {
        this.getBoardCellAt(height, width)?.setStartingCoordinate(coordinate)
    }

    getBoardWidthInPx (): number {
        const lastXCoordinate = this.board[this.getBoardHeight() - 1][this.getBoardWidth() - 1]
            .getStartingCoordinate()
        return lastXCoordinate
            ? lastXCoordinate.x
            : 0
    }

    getBoardHeightInPx (): number {
        const lastYCoordinate = this.board[this.getBoardHeight() - 1][this.getBoardWidth() - 1]
            .getStartingCoordinate()
        return lastYCoordinate
            ? lastYCoordinate.y
            : 0
    }

    removeLeftWall (coord: Coordinate) {
        this.board[coord.y][coord.x].removeWall(3)
    }

    removeRightWall (coord: Coordinate) {
        this.board[coord.y][coord.x].removeWall(1)
    }

    removeTopWall (coord: Coordinate) {
        this.board[coord.y][coord.x].removeWall(0)
    }

    removeBottomWall (coord: Coordinate) {
        this.board[coord.y][coord.x].removeWall(2)
    }

    setBoardToUnvisited () {
        const newBoard = new Maze(this.getBoardWidth(), this.getBoardHeight(), this.getBoard())
        for (let y = 0; y < this.getBoardHeight(); y++) {
            for (let x = 0; x < this.getBoardWidth(); x++) {
                newBoard.setCellState(new Coordinate(x, y), CellState.UNVISITED)
            }
        }
        this.setBoard(newBoard)
    }

    getBoardCellState (coord: Coordinate): CellState {
        return this.board[coord.y][coord.x].getState()
    }
}
