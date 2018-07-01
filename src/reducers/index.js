import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'
import userReducer from './user'
import { initialState as registration } from './registration'

const rootReducer = combineReducers({
	user:userReducer,
	...createForms({
		registration
	})
})

export default rootReducer
