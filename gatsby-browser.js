import React, { createElement } from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { Transition } from 'react-transition-group'
import createHistory from 'history/createBrowserHistory'

import store from 'store'

const getTransitionStyles = timeout => {
	return {
		entering: {
			opacity: 0,
		},
		entered: {
			transition: `opacity ${timeout}ms ease-in-out`,
			opacity: 1,
		},
		exiting: {
			transition: `opacity ${timeout}ms ease-in-out`,
			opacity: 0,
		},
	}
}

const getTransitionStyle = ({ timeout, status }) => getTransitionStyles(timeout)[status]

const timeout = 250
const historyExitingEventType = `history::exiting`

const getUserConfirmation = (pathname, callback) => {
	const event = new CustomEvent(historyExitingEventType, { detail: { pathname } })
	window.dispatchEvent(event)
	setTimeout(() => {
		callback(true)
	}, timeout)
}
const history = createHistory({ getUserConfirmation })
// block must return a string to conform
history.block((location, action) => location.pathname)
exports.replaceHistory = () => history

class ReplaceComponentRenderer extends React.Component {
	constructor(props) {
		super(props)
		this.state = { exiting: false, nextPageResources: {} }
		this.listenerHandler = this.listenerHandler.bind(this)
	}

	listenerHandler(event) {
		const nextPageResources =
			this.props.loader.getResourcesForPathname(
				event.detail.pathname,
				nextPageResources => this.setState({ nextPageResources })
			) || {}
		this.setState({ exiting: true, nextPageResources })
	}

	componentDidMount() {
		window.addEventListener(historyExitingEventType, this.listenerHandler)
	}

	componentWillUnmount() {
		window.removeEventListener(historyExitingEventType, this.listenerHandler)
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.location.key !== nextProps.location.key) {
			this.setState({ exiting: false, nextPageResources: {} })
		}
	}

	render() {
		const transitionProps = {
			timeout: {
				enter: 0,
				exit: timeout,
			},
			appear: true,
			in: !this.state.exiting,
			key: this.props.location.key,
		}
		return (
			<Transition {...transitionProps}>
				{status =>
					createElement(this.props.pageResources.component, {
						...this.props,
						...this.props.pageResources.json,
						transition: {
							status,
							timeout,
							style: getTransitionStyle({ status, timeout }),
							nextPageResources: this.state.nextPageResources,
						},
					})
				}
			</Transition>
		)
	}
}

exports.replaceComponentRenderer = ({ props, loader }) => {
	if (props.layout) {
		return undefined
	}
	return createElement(ReplaceComponentRenderer, { ...props, loader })
}

exports.replaceRouterComponent = ({ history }) => {
	const ConnectedRouterWrapper = ({ children }) => (
		<Provider store={store}>
			<Router history={history}>{children}</Router>
		</Provider>
	)

	return ConnectedRouterWrapper
}
