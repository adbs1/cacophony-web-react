import React from 'react'
import { Route, Switch } from 'react-router'
import HomePage from '../components/pages/HomePage'
import LoginPage from '../components/pages/LoginPage'
import RegisterPage from '../components/pages/RegisterPage'
import AudioPage from '../components/pages/AudioPage'
import AudioBaitPage from '../components/pages/AudioBaitPage'
import RecordingsPage from '../components/pages/RecordingsPage'
import GroupsPage from '../components/pages/GroupsPage'
import DevicesPage from '../components/pages/DevicesPage'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import NoMatch from '../components/NoMatch'

const routes = (
	<div>
		<NavBar />
		<Switch>
			<Route path="/login" component={LoginPage}/>
			<Route exact path="/" component={HomePage}/>
			<Route path="/register" component={RegisterPage}/>
			<Route path="/audio" component={AudioPage}/>
			<Route path="/audiobait" component={AudioBaitPage}/>
			<Route path="/recordings" component={RecordingsPage}/>
			<Route path="/groups" component={GroupsPage}/>
			<Route path="/devices" component={DevicesPage}/>
			<Route component={NoMatch}/>
		</Switch>
		<Footer />
	</div>
)

export default routes
