import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Layout from './layout/Layout'
import { ApplicationContainer } from './components/ApplicationContainer'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Layout>
                <ApplicationContainer />
            </Layout>
        </Provider>
    )
}

export default App
