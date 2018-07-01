import userService from '../services/service.user'

export const REQUEST_LOGIN = "REQUEST_LOGIN"
const requestLogin = (credentials) => {
	return {
		type: REQUEST_LOGIN,
		data: credentials
	}
}

export const RECEIVE_LOGIN = "RECEIVE_LOGIN"
export const receiveLogin = (json) => {
	return {
		type: RECEIVE_LOGIN,
		data: json,
		receivedAt: Date.now()
	}
}

export const REJECT_LOGIN = "REJECT_LOGIN"
const rejectLogin = (json) => {
	return {
		type: REJECT_LOGIN,
		data: json,
		receivedAt: Date.now()
	}
}

export const INVALIDATE_LOGIN = 'INVALIDATE_LOGIN'
export const invalidateLogin = () => {
	return {
		type: INVALIDATE_LOGIN
	}
}

export const logout = () => {

	userService.logout()
	return dispatch => {
		dispatch(invalidateLogin())
	}
}

export const login = (credentials) => {
	return dispatch => {
		dispatch(invalidateLogin())
		dispatch(requestLogin(credentials))

		userService.login(credentials)
			.then(response => response.json())
			.then((json) => {
				if(!json.success) {
					dispatch(rejectLogin(json))
					return
				}
				userService.persistUser(json)
				dispatch(receiveLogin(json))
			})
	}
}
