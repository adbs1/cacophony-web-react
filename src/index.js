import { AppContainer } from 'react-hot-loader'
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import rootReducer from './reducers'
import rootStore from './stores'
import 'bootstrap'
import './scss/styles.scss'

const history = createBrowserHistory()
const store = rootStore(history,rootReducer)

const render = () => {

	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<App history={history}/>
			</Provider>
		</AppContainer>,
		document.getElementById('react-root')
	)
}

render()

// Hot reloading
if (module.hot) {
	// Reload components
	module.hot.accept('./App',() => {
		render()
	})

	// Reload reducers
	module.hot.accept('./reducers',() => {
		store.replaceReducer(connectRouter(history)(rootReducer))
	})
}
