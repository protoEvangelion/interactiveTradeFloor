import React from 'react'
import Link from 'gatsby-link'

export default class DefaultLayout extends React.Component {
	render() {
		return (
			<div style={this.props.transition && this.props.transition.style}>
				<Link to="/la">
					<h3>LA</h3>
				</Link>

				<Link to="/lb">
					<h3>LB</h3>
				</Link>
			</div>
		)
	}
}
