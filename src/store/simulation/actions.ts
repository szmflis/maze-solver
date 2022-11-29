import { Action, bindActionCreators } from 'redux'
import store from '..'

interface ChangeBoardWidthAction extends Action<'ChangeBoardWidth'> {
    newWidth: number
}

interface ChangeBoardHeightAction extends Action<'ChangeBoardHeight'> {
    newHeight: number
}

const changeBoardWidth = (newWidth: number): ChangeBoardWidthAction => ({
    type: 'ChangeBoardWidth',
    newWidth
})

const changeBoardHeight = (newHeight: number): ChangeBoardHeightAction => ({
    type: 'ChangeBoardHeight',
    newHeight
})

export type SimulationActions = ChangeBoardHeightAction
    | ChangeBoardWidthAction

export const simulationActionDispatcher = bindActionCreators(
    {
        changeBoardWidth,
        changeBoardHeight
    },
    store.dispatch
)
