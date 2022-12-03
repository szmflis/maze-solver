import { Coordinate } from '../utils/Coordinate'

export enum CellState {
    WALL, AIR, VISITED, UNVISITED, PLAYER
}

export class Cell {
    private state: CellState
    private startingCoordinate: Coordinate | null

    constructor (state: CellState) {
        this.state = state
        this.startingCoordinate = null
    }

    getState (): CellState {
        return this.state
    }

    setState (state: CellState): void {
        this.state = state
    }

    getStartingCoordinate (): Coordinate | null {
        return this.startingCoordinate
    }

    setStartingCoordinate (coordinate: Coordinate): void {
        this.startingCoordinate = coordinate
    }

}
