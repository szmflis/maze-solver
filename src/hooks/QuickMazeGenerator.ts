import { Maze } from '../classes/model/Maze'
import { DepthFirstSearchMazeGenerator } from '../classes/mazeGenerators/DepthFirstSearchMazeGenerator'
import { Coordinate } from '../utils/Coordinate'
import { CellState } from '../classes/model/Cell'
import { useBoardService } from './BoardService'

export const useQuickMazeGenerator = () => {
    const boardService = useBoardService()

    const quicklyGenerateMaze = () => {
        let maze = new Maze(boardService.getBoardWidth(), boardService.getBoardHeight())
        maze.setCellState(
            new Coordinate(
                boardService.getBoardWidth() - 1,
                boardService.getBoardHeight() - 1),
            CellState.UNVISITED)
        const mazeGenAlgo = new DepthFirstSearchMazeGenerator(maze, new Coordinate(0, 0))
        while (!mazeGenAlgo.getIsAlgorithmFinished()) {
            maze = mazeGenAlgo.step()
        }
        maze.setCellState(
            new Coordinate(
                boardService.getBoardWidth() - 1,
                boardService.getBoardHeight() - 1),
            CellState.EXIT)
        boardService.setBoard(maze)
    }

    return { quicklyGenerateMaze }
}
