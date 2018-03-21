import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from 'styled-components'
import theme from 'components/themes/default'

import createStore from 'store'

exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const sheet = new ServerStyleSheet()
  const store = createStore()

  const app = () => (
    <Provider store={store}>
      <StyleSheetManager sheet={sheet.instance}>
        {bodyComponent}
      </StyleSheetManager>
    </Provider>
  )
  replaceBodyHTMLString(renderToString(<app />))
  setHeadComponents([sheet.getStyleElement()])
}
