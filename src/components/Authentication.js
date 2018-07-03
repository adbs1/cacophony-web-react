import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

const Authentication = (props) => {
	if (!props.isLoggedIn) {
		return <Redirect to="/login"/>
	}
	return (
		<div>{props.children}</div>
	)
}

Authentication.propTypes = {
	user: PropTypes.object.isRequired,
	isLoggedIn: PropTypes.bool,
	children: PropTypes.object
}

const mapStateToProps = (state) => ({
	user: state.user,
	isLoggedIn: !!state.user.JWT
})
export default connect(mapStateToProps)(Authentication)
