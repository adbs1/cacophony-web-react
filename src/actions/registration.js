import userService from '../services/service.user'
import { invalidateLogin } from './user'
import { actions } from 'react-redux-form'
import { receiveLogin } from './user'

export const REGISTER_REQUEST = "REGISTER_REQUEST"
const requestRegister = () => {
	return {
		type: REGISTER_REQUEST
	}
}

export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
const receiveRegistration = (json) => {
	return {
		type: REGISTER_SUCCESS,
		data: json,
		receivedAt: Date.now()
	}
}

export const REGISTER_FAILURE = "REGISTER_FAILURE"
const rejectRegistration = (json) => {
	return {
		type: REGISTER_FAILURE,
		data: json,
		receivedAt: Date.now()
	}
}

export const register = (username, password) => {

	return dispatch => {
		try {

			dispatch(invalidateLogin())
			dispatch(requestRegister())

			userService.register(username, password)
				.then(response => response.json())
				.then((json) => {

					dispatch(actions.reset('registration'))

					if(!json.success) {
						dispatch(rejectRegistration(json))

						if(json.errorType == "validation") {

							for(let field in json.errors) {
								let fieldError = {}
								fieldError[`${field}Invalid`] = true && json.errors[field].msg
								dispatch(actions.setPending(`registration.${field}`, false))
								dispatch(actions.setTouched(`registration.${field}`, true))
								dispatch(actions.setErrors(`registration.${field}`, fieldError))
							}

							return dispatch(rejectRegistration(json))
						}
					}
					userService.persistUser(json.userData.username, json.token)
					dispatch(receiveRegistration(json))
					dispatch(receiveLogin(json))
				})

		} catch(error) {
			dispatch(rejectRegistration(error))
		}
	}

}
