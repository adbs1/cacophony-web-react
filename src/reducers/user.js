import {
	INVALIDATE_LOGIN,
	REQUEST_LOGIN,
	RECEIVE_LOGIN,
	REJECT_LOGIN
} from '../actions/user'

const initialUserState = {
	isLoggedIn: localStorage.getItem('isLoggedIn') || false,
	isLoggingIn: false,
	didInvalidate: false,
	JWT: localStorage.getItem('JWT'),
	userData: {'username':localStorage.getItem('username')},
	errorMessage: undefined
}

function userReducer(
	state = initialUserState,
	action) {
		switch (action.type) {
			case INVALIDATE_LOGIN:
				return Object.assign({},state, initialUserState,{
					isLoggedIn: false,
					didInvalidate: true,
					lastUpdated: action.receivedAt
				})
			case REQUEST_LOGIN:
				return Object.assign({},state, initialUserState,{
					isLoggingIn: true,
				})
			case REJECT_LOGIN:
				return Object.assign({},state, initialUserState,{
					isLoggedIn: false,
					didInvalidate: true,
					lastUpdated: action.receivedAt,
					errorMessage: action.data.messages || action.data.message
				})
			case RECEIVE_LOGIN:
				return Object.assign({},state,initialUserState,{
					isLoggedIn: true,
					isLoggingIn: false,
					didInvalidate: false,
					lastUpdated: action.receivedAt,
					JWT: action.data.token,
					userData: action.data.userData
				})
			default:
				return state
	}
}

export default userReducer
