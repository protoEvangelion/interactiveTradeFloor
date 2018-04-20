import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import store from './src/store'

exports.replaceRenderer = ({
	bodyComponent,
	replaceBodyHTMLString,
	setHeadComponents,
}) => {
	const ConnectedBody = () => <Provider store={store}>{bodyComponent}</Provider>

	// Add styled-components SSR
	const sheet = new ServerStyleSheet()
	const bodyHTML = renderToString(sheet.collectStyles(<ConnectedBody />))
	const styleElement = sheet.getStyleElement()

	replaceBodyHTMLString(bodyHTML)
	setHeadComponents(styleElement)
}
