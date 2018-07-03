import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Control, LocalForm } from 'react-redux-form'
import { login } from '../actions/user'

const LoginForm = (props) => {

	if(props.isLoggedIn) {
		return <Redirect to="/" />
	}

	if(props.isLoggingIn) {
		return (<div>Logging in ..</div>)
	}

	const login = (values) => {
		props.login(values.username, values.password)
	}

	const errors = (props.errorMessage) ? (<div className="alert alert-danger" role="alert">{props.errorMessage}</div>) : null

	return (
		<LocalForm onSubmit={(values) => login(values)}>
			{errors}
			<div className="form-group">
				<label htmlFor="username">Username</label>
				<Control.text
					className="form-control"
					model=".username"
					id="username"/>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password</label>
				<Control.password
					className="form-control"
					model=".password"
					id="password"/>
			</div>
			<div >
				<button className="btn btn-primary">Sign In</button>
			</div>
		</LocalForm>
	)
}

const mapStateToProps = state => ({
	isLoggingIn: state.user.isLoggingIn,
	isLoggedIn: !!state.user.JWT,
	errorMessage: state.user.errorMessage
})

const mapDispatchToProps = dispatch => ({
	login:(username,password) => dispatch(login(username,password))
})

LoginForm.propTypes = {
	isLoggedIn: PropTypes.bool,
	isLoggingIn: PropTypes.bool,
	errorMessage: PropTypes.string,
	login: PropTypes.func
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)
