import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Layout from 'Components/Layout'
import DetailCard from 'Components/Card/Detail/index.js'
import Home from 'Pages/Home'
import * as ROUTES from 'Constants/routes'

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route component={Home} exact  path={ROUTES.HOME}/>
          <Route component={DetailCard} exact  path={ROUTES.DETAIL}/>
          <Redirect to={ROUTES.HOME}/>
        </Switch>
      </Layout>
    </Router>
  )
}

export default Routes
