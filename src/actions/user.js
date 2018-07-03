import userService from '../services/service.user'

export const REQUEST_LOGIN = "REQUEST_LOGIN"
const requestLogin = (username, password) => {
	return {
		type: REQUEST_LOGIN,
		username,
		password
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

export const login = (username, password) => {
	return dispatch => {
		dispatch(invalidateLogin())
		dispatch(requestLogin(username, password))

		userService.login(username, password)
			.then(response => response.json())
			.then((json) => {
				if(!json.success) {
					dispatch(rejectLogin(json))
					return
				}
				userService.persistUser(json.userData.username,json.token)
				dispatch(receiveLogin(json))
			})
	}
}
