import { Coordinate } from '../utils/Coordinate'
import { Cell, CellState } from './Cell'

export class Board {
    private board: Cell[][]

    constructor (width: number, height: number, board?: Cell[][]) {
        if (board != null) {
            this.board = board
        } else {
            const newBoard: Cell[][] = []
            for (let y = 0; y < height; y++) {
                const row: Cell[] = []
                for (let x = 0; x < width; x++) {
                    row.push(new Cell(CellState.AIR))
                }
                newBoard.push(row)
            }
            this.board = newBoard
        }
    }

    setBoardWidth (newWidth: number): void {
        const newBoard: Cell[][] = []
        for (let y = 0; y < this.getBoardHeight(); y++) {
            const row: Cell[] = []
            for (let x = 0; x < newWidth; x++) {
                const existingState = this.getBoardCellAt(x, y)
                if (existingState != null) {
                    row.push(existingState)
                } else {
                    row.push(new Cell(CellState.AIR))
                }
            }
            newBoard.push(row)
        }
        this.board = newBoard
    }

    setBoardHeight (newHeight: number): void {
        const newBoard: Cell[][] = []
        for (let y = 0; y < newHeight; y++) {
            const row: Cell[] = []
            for (let x = 0; x < this.getBoardWidth(); x++) {
                const existingState = this.getBoardCellAt(x, y)
                if (existingState != null) {
                    row.push(existingState)
                } else {
                    row.push(new Cell(CellState.AIR))
                }
            }
            newBoard.push(row)
        }
        this.board = newBoard
    }

    setCellState (coordinate: Coordinate, state: CellState, debug?: boolean): void {
        if (coordinate.y > this.getBoardHeight() || coordinate.y < 0) {
            console.log('setCellState() ', coordinate.y,
                ' outside of board height ', this.board.length)
            return
        }
        if (coordinate.x > this.getBoardWidth() || coordinate.x < 0) {
            console.log('setCellState() ', coordinate.x,
                ' outside of board width ', this.board[0].length)
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

    getCoordinatesOfCellState (cellState: CellState) {
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board.length; x++) {
                if (this.board[y][x].getState() === cellState) {
                    return new Coordinate(x, y)
                }
            }
        }
        return null
    }

    getStartingCoordinateAt (height: number, width: number): Coordinate | null {
        return this.board[height][width].getStartingCoordinate()
    }

    setStartingCoordinate (height: number, width: number, coordinate: Coordinate): void {
        this.getBoardCellAt(height, width)?.setStartingCoordinate(coordinate)
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

    getBoardCopy (): Board {
        return new Board(this.getBoardWidth(), this.getBoardHeight(), this.getBoard())
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

}
