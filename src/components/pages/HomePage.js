import React from 'react'
import Authentication from '../Authentication'
import './HomePage.scss'

const Home = () => (
	<Authentication>
		<div>
			<div className="hero" />
			<div className="container-fluid">
				Home
			</div>
		</div>
	</Authentication>
)

export default Home
