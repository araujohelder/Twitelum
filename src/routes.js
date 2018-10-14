import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import LoginPage from './pages/LoginPage'

function estaAutenticado() {
    if (localStorage.getItem('TOKEN')) {
        return true
    } else {
        return false
    }
}

const Roteamento = () => {
    return (
        <Switch>
            <PrivateRoute path="/" component={ Home } exact />
            <Route path="/login" component={ LoginPage } />
        </Switch>
    )
}

class PrivateRoute extends React.Component {
    render() {
        const Component = this.props.component
        const props = this.props
        if (estaAutenticado()) {
            return (<Route render={() => <Component {...props}/> }/> )
        } else {
            return (<Redirect to="/login"/>)
        }
    }
}

export default Roteamento