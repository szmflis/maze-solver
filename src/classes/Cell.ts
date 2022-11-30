export enum CellState {
    UNCHECKED, CHECKED
}

export class Cell {
    private state: CellState

    constructor (state: CellState) {
        this.state = state
    }

    getState (): CellState {
        return this.state
    }

    setState (state: CellState): void {
        this.state = state
    }
}
