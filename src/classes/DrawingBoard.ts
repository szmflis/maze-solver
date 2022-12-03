import { Coordinate } from '../utils/Coordinate'

export class DrawingBoard {
    private readonly board: Coordinate[][]

    constructor (board: Coordinate[][]) {
        this.board = board
    }

    getCoordinateAt (height: number, width: number): Coordinate {
        return this.board[height][width]
    }

    getHeight (): number {
        return this.board.length
    }

    getWidth (): number {
        return this.board[0].length
    }

    getBoard (): Coordinate[][] {
        return this.board
    }
}
