import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { simulationReducer } from './simulation/reducer'
import thunkMiddleware from 'redux-thunk'
import { boardReducer } from './board/reducer'

const rootReducer = combineReducers({
    simulationReducer,
    boardReducer
})

export type AppState = ReturnType<typeof rootReducer>

function configureStore () {
    const middleware = [thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middleware)
    return createStore(
        rootReducer,
        compose(middlewareEnhancer)
    )
}

export default configureStore()
