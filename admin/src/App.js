import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import AdminIndex from './pages/Index'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/index" component={AdminIndex} />
      </Switch>
    </Router>
  )
}

export default App
