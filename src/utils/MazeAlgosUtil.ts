import { Direction } from '../enums/Direction'
import { Coordinate } from './Coordinate'
import { CellState } from '../classes/model/Cell'
import { Maze } from '../classes/model/Maze'

export const getAllPossibleDirectionsFromCoord = (forCoordinate: Coordinate, maze: Maze): Direction[] => {
    const left: Direction = {
        cell: maze.getBoardCellAt(forCoordinate.x - 1, forCoordinate.y),
        direction: 'LEFT'
    }
    const right: Direction = {
        cell: maze.getBoardCellAt(forCoordinate.x + 1, forCoordinate.y),
        direction: 'RIGHT'
    }
    const top: Direction = {
        cell: maze.getBoardCellAt(forCoordinate.x, forCoordinate.y - 1),
        direction: 'TOP'
    }
    const bottom: Direction = {
        cell: maze.getBoardCellAt(forCoordinate.x, forCoordinate.y + 1),
        direction: 'BOTTOM'
    }

    const returnArr = []

    if (forCoordinate.x + 1 < maze.getBoardWidth()) {
        returnArr.push(right)
    }
    if (forCoordinate.x - 1 >= 0) {
        returnArr.push(left)
    }
    if (forCoordinate.y + 1 < maze.getBoardHeight()) {
        returnArr.push(bottom)
    }
    if (forCoordinate.y - 1 >= 0) {
        returnArr.push(top)
    }
    return returnArr
}

export const getAdjecentUnvisitedDirecitons = (directions: Direction[]): Direction[] => {
    return directions.filter(
        dir => dir.cell !== null &&
        (dir.cell.getState() === CellState.UNVISITED))
}

export const getAdjecentVisitedDirections = (directions: Direction[]): Direction[] => {
    return directions.filter(
        dir => dir.cell !== null &&
        dir.cell.getState() === CellState.VISITED)
}

export const getPossibleUnwalledDirections = (directions: Direction[]): Direction[] => {
    return directions.filter(dir => {
        const adjectentCell = dir.cell
        switch (dir.direction) {
        case 'LEFT': {
            if (adjectentCell) return !adjectentCell.getWalls()[1]
            break
        }
        case 'RIGHT': {
            if (adjectentCell) return !adjectentCell.getWalls()[3]
            break
        }
        case 'TOP': {
            if (adjectentCell) return !adjectentCell.getWalls()[2]
            break
        }
        case 'BOTTOM': {
            if (adjectentCell) return !adjectentCell.getWalls()[0]
            break
        }
        }
        return false
    })
}

export const getRandomDirectionFrom = (availableDirections: Direction[]) => {
    return availableDirections[Math.floor(Math.random() * availableDirections.length)]
}

export const getRandomNumberInRange = (from: number, to: number) => {
    return Math.floor(Math.random() * to) + from
}

export const removeWallsBetween = (
    coord1: Coordinate,
    coord2: Coordinate,
    direction: Direction,
    maze: Maze): Maze => {
    const newMaze = maze
    if (direction.direction === 'LEFT') {
        newMaze.removeLeftWall(coord1)
        newMaze.removeRightWall(coord2)
    }
    if (direction.direction === 'RIGHT') {
        newMaze.removeRightWall(coord1)
        newMaze.removeLeftWall(coord2)
    }
    if (direction.direction === 'TOP') {
        newMaze.removeTopWall(coord1)
        newMaze.removeBottomWall(coord2)
    }
    if (direction.direction === 'BOTTOM') {
        newMaze.removeBottomWall(coord1)
        newMaze.removeTopWall(coord2)
    }
    return newMaze
}

export const getNextCoordinate = (
    fromCoord: Coordinate, direction: Direction
): Coordinate => {
    switch (direction.direction) {
    case 'LEFT': return new Coordinate(fromCoord.x - 1, fromCoord.y)
    case 'BOTTOM': return new Coordinate(fromCoord.x, fromCoord.y + 1)
    case 'RIGHT': return new Coordinate(fromCoord.x + 1, fromCoord.y)
    case 'TOP': return new Coordinate(fromCoord.x, fromCoord.y - 1)
    }
}
