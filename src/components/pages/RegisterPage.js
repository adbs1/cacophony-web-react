import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Control, Form, actions, Errors } from 'react-redux-form'
import { register } from '../../actions/registration'
import { Redirect } from 'react-router'

const RegisterPage = (props) => {

	if(props.isLoggedIn) {
		return <Redirect to="/" />
	}

	const handleSubmit = values => {
		props.dispatch(register(values.username, values.password, values.passwordConfirm))
	}

	const handleChange = () => {
		props.dispatch(actions.resetValidity("registration"))
	}

	// Validators
	const passwordLength = (val) => (Boolean(val) && val.length >= 8)
	const usernameLength = (val) => (Boolean(val) && val.length >= 5)
	const passwordsMatch = () => {
		return props.registration.passwordConfirm.value === props.registration.password.value
	}

	// Messages constants
	const PASSWORD_ERROR_LENGTH = 'Password must be at least 8 characters'
	const PASSWORD_ERROR_MATCH = "Passwords must match"
	const USERNAME_ERROR_LENGTH = 'Username must be at least 5 characters'

	return (
		<div className="container-fluid">
			<h1>Register</h1>

			<Form model="registration"
					onSubmit={(values) => handleSubmit(values)}
					onChange={handleChange}
					validateOn="submit"
					validators={{
						'': { passwordsMatch },
						passwordsMatch,
						'usernameInvalid': false,
						'passwordInvalid': true

					}} >

				<div className="form-group">
					<label htmlFor="username">Username:</label>
					<Control.text
						className="form-control"
						model=".username"
						validators={{ usernameLength }}
						id="username"
					/>
					<Errors
						model=".username"
						className="alert alert-danger"
						show={{touched: true, focus: false}}
						messages={{
							usernameLength: USERNAME_ERROR_LENGTH
						}}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<Control.password
						className="form-control"
						model=".password"
						validators={{ passwordLength }}
						id="password"
					/>
					<Errors
						model=".password"
						className="alert alert-danger"
						show={{touched: true, focus: false}}
						messages={{
							passwordLength: PASSWORD_ERROR_LENGTH
						}}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="passwordConfirm">Confirm Password:</label>
					<Control.password
						className="form-control"
						model=".passwordConfirm"
						id="passwordConfirm" />
					<Errors
						model="registration"
						className="alert alert-danger"
						messages={{
							passwordsMatch: PASSWORD_ERROR_MATCH
						}}
					/>
				</div>
				<Control.button className="btn btn-primary" model="registration">
					Register
				</Control.button>

			</Form>
		</div>
	)

}

const mapStateToProps = state => ({
	registration: state.forms.registration,
	user: state.user,
	isLoggedIn: !!state.user.JWT
})

RegisterPage.propTypes = {
	user: PropTypes.object.isRequired,
	registration: PropTypes.object.isRequired,
	dispatch: PropTypes.func,
	login: PropTypes.func,
	isLoggedIn: PropTypes.bool
}

export default connect(mapStateToProps)(RegisterPage)
