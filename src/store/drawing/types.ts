import { DrawingBoard } from '../../classes/DrawingBoard'

export interface DrawingState {
    readonly drawingBoard: DrawingBoard
    readonly blockSideInPx: number
}
