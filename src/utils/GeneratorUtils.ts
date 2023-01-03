import { Direction } from '../enums/Direction'

export const getRandomDirectionFrom = (availableDirections: Direction[]) => {
    return availableDirections[Math.floor(Math.random() * availableDirections.length)]
}
