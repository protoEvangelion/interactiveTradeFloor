import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from 'store'

exports.replaceRouterComponent = ({ history }) => {
	const ConnectedRouterWrapper = ({ children }) => (
		<Provider store={store}>
			<Router history={history}>{children}</Router>
		</Provider>
	)

	return ConnectedRouterWrapper
}
