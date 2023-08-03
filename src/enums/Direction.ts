import { Cell } from '../classes/model/Cell'

export interface Direction {
    direction: 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'
    cell: Cell | null
}
