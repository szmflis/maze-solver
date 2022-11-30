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
                    row.push(new Cell(CellState.UNCHECKED))
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
                console.log(newWidth)
                const existingState = this.getBoardStateAt(x, y)
                if (existingState != null) {
                    row.push(existingState)
                } else {
                    row.push(new Cell(CellState.UNCHECKED))
                }
            }
            newBoard.push(row)
        }
        console.log(newBoard)
        this.board = newBoard
    }

    setCellState (coordinate: Coordinate, state: CellState): void {
        console.log('Checking state: ', coordinate)
        if (coordinate.y > this.getBoardHeight()) {
            console.log('setCellState() ', coordinate.y,
                ' outside of board height ', this.board.length)
            return
        }
        if (coordinate.x > this.getBoardWidth()) {
            console.log('setCellState() ', coordinate.x,
                ' outside of board width ', this.board[0].length)
            return
        }
        this.board[coordinate.y][coordinate.x].setState(state)
    }

    getBoardStateAt (x: number, y: number): Cell | null {
        if (x < this.getBoardWidth() && y < this.getBoardHeight()) {
            return this.board[y][x]
        } else {
            return null
        }
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
}
