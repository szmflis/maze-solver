import { Cell } from '../classes/Cell'

export interface Direction {
    direction: 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'
    cell: Cell | null
}
