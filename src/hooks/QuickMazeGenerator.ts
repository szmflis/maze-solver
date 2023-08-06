import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { Maze } from '../classes/model/Maze'
import { DepthFirstSearchMazeGenerator } from '../classes/mazeGenerators/DepthFirstSearchMazeGenerator'
import { Coordinate } from '../utils/Coordinate'
import { boardActionDispatcher } from '../store/board/actions'
import { CellState } from '../classes/model/Cell'

export const useQuickMazeGenerator = () => {
    const boardState = useSelector((state: AppState) => state.boardReducer)

    const quicklyGenerateMaze = () => {
        let maze = new Maze(boardState.boardWidth, boardState.boardHeight)
        maze.setCellState(new Coordinate(boardState.boardWidth - 1, boardState.boardHeight - 1), CellState.UNVISITED)
        const mazeGenAlgo = new DepthFirstSearchMazeGenerator(maze, new Coordinate(0, 0))

        while (!mazeGenAlgo.getIsAlgorithmFinished()) {
            maze = mazeGenAlgo.step()
        }
        maze.setCellState(new Coordinate(boardState.boardWidth - 1, boardState.boardHeight - 1), CellState.EXIT)
        boardActionDispatcher.setBoard(maze)
    }

    return { quicklyGenerateMaze }
}
