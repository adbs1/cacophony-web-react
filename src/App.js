import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'

const App = (props) => {
	return (
		<ConnectedRouter history={props.history}>
			{ routes }
		</ConnectedRouter>
	)
}

App.propTypes = {
	history:PropTypes.object
}

export default App
