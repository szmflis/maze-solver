import { Coordinate } from '../../utils/Coordinate'

export enum CellState {
    AIR, VISITED, UNVISITED, PLAYER, ENTRY, EXIT
}

export class Cell {
    private state: CellState
    private startingCoordinate: Coordinate | null
    private walls: boolean[]

    constructor (state: CellState) {
        this.state = state
        this.startingCoordinate = null
        this.walls = [true, true, true, true] // top right bottom left
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

    removeWall (side: number) {
        this.walls[side] = false
    }

    addWall (side: number) {
        this.walls[side] = true
    }

    getWalls () {
        return this.walls
    }
}
