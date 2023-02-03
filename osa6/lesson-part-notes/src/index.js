import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App'
import store from './store'

const root = createRoot(document.getElementById('root'))
const renderApp = () => root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

renderApp()
// store.subscribe(renderApp)
