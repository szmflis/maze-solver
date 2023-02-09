import { Direction } from '../enums/Direction'

export const getRandomDirectionFrom = (availableDirections: Direction[]) => {
    return availableDirections[Math.floor(Math.random() * availableDirections.length)]
}

export const getRandomNumberInRange = (from: number, to: number) => {
    return Math.floor(Math.random() * to) + from
}
