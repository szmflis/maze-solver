import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Direction } from '../enums/Direction'
import { useInterval } from '../hooks/useInterval'
import { AppState } from '../store'
import { boardActionDispatcher } from '../store/board/actions'
import { simulationActionDispatcher } from '../store/simulation/actions'
import { statisticsActionDispatcher } from '../store/statistics/actions'
import { Coordinate } from '../utils/Coordinate'
import { getRandomDirectionFrom } from '../utils/GeneratorUtils'
import { Board } from './Board'
import { CellState } from './Cell'
import { Step } from './Step'
import { StepStack } from './StepStack'

export const useDepthFirstSearchMazeGenerator = (
    initPosition: Coordinate
) => {
    const [position, setPosition] = useState<Coordinate>(initPosition)
    const simulationState = useSelector((state: AppState) => state.simulationReducer)
    const simulationBoard = useSelector((state: AppState) => state.boardReducer.board)

    const stepStack = new StepStack()

    useInterval(() => {
        step()
    }, simulationState.isRunning ? 1 : null)

    const step = (): void => {
        if (simulationState.simulationStep === 0) {
            boardActionDispatcher.checkEntireBoard()
        }
        stepStack.clearSteps()
        generateNewBoard(position)
        simulationActionDispatcher.incrementSimulationStep()
        statisticsActionDispatcher.addStepStack(stepStack)
        console.log(stepStack)
    }

    const generateNewBoard = (fromCoord: Coordinate) => {
        let newBoard = new Board(
            simulationBoard.getBoardWidth(),
            simulationBoard.getBoardHeight(),
            simulationBoard.getBoard())

        const allDirections = getAllDirections(fromCoord)
        stepStack.addStep(new Step(
            'SEARCH',
            `Found ${allDirections.length} possible directions: ${allDirections.join(' ')}`))
        const availableUnvisitedDirections = getUnvisitedDirecitons(allDirections)
        stepStack.addStep(new Step(
            'SEARCH',
            `Unvisited directions: ${availableUnvisitedDirections.join(' ')}`))
        if (availableUnvisitedDirections.length === 0) {
            stepStack.addStep(new Step('SEARCH', 'Found no unvisited directions'))
            const availableVisitedDirections = getVisitedDirections(allDirections)
            stepStack.addStep(new Step('SEARCH',
                `Found ${availableVisitedDirections.length} visited directions directions`))
            if (availableVisitedDirections.length === 0) {
                stepStack.addStep(new Step('FINISHED', 'Finished generation'))
                finishGeneration()
            } else {
                newBoard = moveBackToVisitedDirection(fromCoord, availableVisitedDirections, newBoard)
            }
        } else {
            newBoard = moveToUnvisitedDirection(fromCoord, availableUnvisitedDirections, newBoard)
        }
        boardActionDispatcher.setBoard(newBoard)
    }

    const finishGeneration = () => {
        console.log('generation finished')
        simulationActionDispatcher.finishSimulation()
    }

    const moveToUnvisitedDirection = (
        fromCoord: Coordinate,
        availableUnvisitedDirections: Direction[],
        inputBoard: Board
    ): Board => {
        const randomDirection = getRandomDirectionFrom(availableUnvisitedDirections)
        if (randomDirection.direction === 'LEFT') {
            const nextCoord = new Coordinate(fromCoord.x - 1, fromCoord.y)
            stepStack.addStep(new Step('MOVE', `Moving to coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}]`))
            inputBoard.removeLeftWall(position)
            inputBoard.removeRightWall(nextCoord)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${position.x}] [y : ${position.y}] to VISITED`))
            inputBoard.setCellState(position, CellState.VISITED)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}] to PLAYER`))
            inputBoard.setCellState(nextCoord, CellState.PLAYER)
            setPosition(nextCoord)
        }

        if (randomDirection.direction === 'RIGHT') {
            const nextCoord = new Coordinate(fromCoord.x + 1, fromCoord.y)
            stepStack.addStep(new Step('MOVE', `Moving to coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}]`))
            inputBoard.removeRightWall(position)
            inputBoard.removeLeftWall(nextCoord)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${position.x}] [y : ${position.y}] to VISITED`))
            inputBoard.setCellState(position, CellState.VISITED)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}] to PLAYER`))
            inputBoard.setCellState(nextCoord, CellState.PLAYER)
            setPosition(nextCoord)
        }

        if (randomDirection.direction === 'TOP') {
            const nextCoord = new Coordinate(fromCoord.x, fromCoord.y - 1)
            stepStack.addStep(new Step('MOVE', `Moving to coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}]`))
            inputBoard.removeTopWall(position)
            inputBoard.removeBottomWall(nextCoord)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${position.x}] [y : ${position.y}] to VISITED`))
            inputBoard.setCellState(position, CellState.VISITED)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}] to PLAYER`))
            inputBoard.setCellState(nextCoord, CellState.PLAYER)
            setPosition(nextCoord)
        }

        if (randomDirection.direction === 'BOTTOM') {
            const nextCoord = new Coordinate(fromCoord.x, fromCoord.y + 1)
            stepStack.addStep(new Step('MOVE', `Moving to coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}]`))
            inputBoard.removeBottomWall(position)
            inputBoard.removeTopWall(nextCoord)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${position.x}] [y : ${position.y}] to VISITED`))
            inputBoard.setCellState(position, CellState.VISITED, true)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}] to PLAYER`))
            inputBoard.setCellState(nextCoord, CellState.PLAYER, true)
            setPosition(nextCoord)
        }
        return inputBoard
    }

    const moveBackToVisitedDirection = (
        fromCoord: Coordinate,
        availableVisitedDirections: Direction[],
        inputBoard: Board
    ): Board => {
        const currentCell = simulationBoard.getBoardCellAt(position.x, position.y)
        if (!currentCell) return inputBoard
        const randomChosenDirection = availableVisitedDirections[0]
        const randomChosenCell = randomChosenDirection.cell
        if (!randomChosenCell) return inputBoard
        switch (randomChosenDirection.direction) {
        case 'LEFT': {
            const nextCoord = new Coordinate(fromCoord.x - 1, fromCoord.y)
            stepStack.addStep(new Step('MOVE', `Moving to coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}]`))
            inputBoard.setCellState(position, CellState.AIR)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${position.x}] [y : ${position.y}] to VISITED`))
            inputBoard.setCellState(nextCoord, CellState.PLAYER)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}] to PLAYER`))
            setPosition(nextCoord)
            return inputBoard
        }
        case 'RIGHT': {
            const nextCoord = new Coordinate(fromCoord.x + 1, fromCoord.y)
            stepStack.addStep(new Step('MOVE', `Moving to coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}]`))
            inputBoard.setCellState(position, CellState.AIR)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${position.x}] [y : ${position.y}] to VISITED`))
            inputBoard.setCellState(nextCoord, CellState.PLAYER)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}] to PLAYER`))
            setPosition(nextCoord)
            return inputBoard
        }
        case 'TOP': {
            const nextCoord = new Coordinate(fromCoord.x, fromCoord.y - 1)
            stepStack.addStep(new Step('MOVE', `Moving to coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}]`))
            inputBoard.setCellState(position, CellState.AIR)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${position.x}] [y : ${position.y}] to VISITED`))
            inputBoard.setCellState(nextCoord, CellState.PLAYER)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}] to PLAYER`))
            setPosition(nextCoord)
            return inputBoard
        }
        case 'BOTTOM': {
            const nextCoord = new Coordinate(fromCoord.x, fromCoord.y + 1)
            stepStack.addStep(new Step('MOVE', `Moving to coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}]`))
            inputBoard.setCellState(position, CellState.AIR)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${position.x}] [y : ${position.y}] to VISITED`))
            inputBoard.setCellState(nextCoord, CellState.PLAYER)
            stepStack.addStep(new Step('MOVE',
                `Setting coordinate [x : ${nextCoord.x}] [y : ${nextCoord.y}] to PLAYER`))
            setPosition(nextCoord)
            return inputBoard
        }
        }
    }

    const getAllDirections = (forCoordinate: Coordinate): Direction[] => {
        const left: Direction = {
            cell: simulationBoard.getBoardCellAt(forCoordinate.x - 1, forCoordinate.y),
            direction: 'LEFT'
        }
        const right: Direction = {
            cell: simulationBoard.getBoardCellAt(forCoordinate.x + 1, forCoordinate.y),
            direction: 'RIGHT'
        }
        const top: Direction = {
            cell: simulationBoard.getBoardCellAt(forCoordinate.x, forCoordinate.y - 1),
            direction: 'TOP'
        }
        const bottom: Direction = {
            cell: simulationBoard.getBoardCellAt(forCoordinate.x, forCoordinate.y + 1),
            direction: 'BOTTOM'
        }
        return [left, right, top, bottom]
    }

    const getUnvisitedDirecitons = (directions: Direction[]): Direction[] => {
        return directions.filter(
            dir => dir.cell !== null &&
            (dir.cell.getState() === CellState.UNVISITED))
    }

    const getVisitedDirections = (directions: Direction[]): Direction[] => {
        const adjecentVisitedDirecitons = directions.filter(
            dir => dir.cell !== null &&
            dir.cell.getState() !== CellState.AIR)

        return adjecentVisitedDirecitons.filter(dir => {
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

    const getBoard = (): Board => {
        return simulationBoard
    }

    const getRandomDirection = (directions: Direction[]): Direction => {
        const randomInt = Math.floor(Math.random() * Object.keys(directions).length)
        return Object.values(directions)[randomInt]
    }

    return { step }
}
