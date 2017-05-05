import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { FloorplanPage } from 'components'
import { NotFoundPage } from 'containers'

const routes = (
  <Route path="/" component={App}>
    <Route path="/la" component={FloorplanPage} />
    <Route path="/lb" component={FloorplanPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
)

export default routes
