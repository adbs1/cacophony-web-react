import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../actions/user'
import logo from '../../public/images/titlebar.png'

const userMessage = (props) => {
	return (props.user.isLoggedIn) ?

		<div className="collapse navbar-collapse" id="navbarToggler">
			<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
				<li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/audio">Audio</NavLink></li>
				<li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/audiobait">Audio Bait</NavLink></li>
				<li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/recordings">Recordings</NavLink></li>
				<li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/groups">Groups</NavLink></li>
				<li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/devices">Devices</NavLink></li>
			</ul>
			<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
				<li className="nav-item"><span className="nav-link">Hello {props.user.userData.username}</span></li>
				<li className="nav-item"><a className="nav-link" onClick={props.logout}>Logout</a></li>
			</ul>
		</div>
		:
		<div className="collapse navbar-collapse" id="navbarToggler">
			<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
				<li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink></li>
				<li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/register">Register</NavLink></li>
			</ul>
		</div>
}

userMessage.propTypes = {
	user: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired
}

const NavBar = (props) => (
	<nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<NavLink className="navbar-brand" to="/" alt="home">
			<img src={logo}/>
		</NavLink>
		{userMessage(props)}
	</nav>
)

const mapStateToProps = state => ({user: state.user })

const mapDispatchToProps = dispatch => ({
	logout:() => dispatch(logout())
})

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)
