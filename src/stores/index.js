import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootStore = (history,rootReducer) => {
	return createStore(
		connectRouter(history)(rootReducer),
		composeEnhancer(
			applyMiddleware(
				routerMiddleware(history),
				thunkMiddleware,
				loggerMiddleware
			)
		)
	)
}
export default rootStore
