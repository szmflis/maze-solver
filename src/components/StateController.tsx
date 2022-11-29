import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { simulationActionDispatcher } from '../store/simulation/actions'

export const StateController: React.FC = () => {
    const boardWidth = useSelector<AppState, number>(
        (state: AppState) => state.simulationReducer.boardWidth)

    return (
        <div>
            {boardWidth}
            <button onClick={() => simulationActionDispatcher.changeBoardWidth(boardWidth + 1)}>
                increase!
            </button>
        </div>
    )
}
