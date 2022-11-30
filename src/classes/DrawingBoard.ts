import { Coordinate } from '../utils/Coordinate'

export class DrawingBoard {
    private readonly board: Coordinate[][]

    constructor (board: Coordinate[][]) {
        this.board = board
    }

    getBoard (): Coordinate[][] {
        return this.board
    }
}
