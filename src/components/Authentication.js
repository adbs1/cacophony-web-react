import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

const Authentication = (props) => {
	if (!props.user.isLoggedIn) {
		return <Redirect to="/login"/>
	}
	return (
		<div>{props.children}</div>
	)
}

Authentication.propTypes = {
	user: PropTypes.object.isRequired,
	children: PropTypes.object
}

const mapStateToProps = (state) => ({user:state.user})
export default connect(mapStateToProps)(Authentication)
