import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE
} from '../actions/registration'


export const initialState = {
	password: "",
	username: "",
	passwordConfirm: "",
	registering: false,
}

export function registration(state = {}, action) {
	switch (action.type) {
		case REGISTER_REQUEST:
			return { registering: true }
		case REGISTER_SUCCESS:

			return Object.assign({}, state, initialState, {
				registering: false
			})
		case REGISTER_FAILURE:
			return Object.assign({}, state, initialState, {
				registering: false

			})
		default:
			return state
	}
}
