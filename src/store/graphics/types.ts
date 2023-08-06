import { Coordinate } from '../../utils/Coordinate'

export interface GraphicsState {
    readonly drawStartPoints: Coordinate[][]
    readonly drawingContext: CanvasRenderingContext2D | null
    readonly blockSide: number
}
