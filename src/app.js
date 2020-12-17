import React, { Component } from 'react';
import {Route, Switch, Redirect, BrowserRouter as Router} from "react-router-dom";

import Login from "./components/login";
import ForgotPassword from "./components/forgot-password";
import Register from "./components/registration";
import PrivateRoute from "./components/private-route";
import Body from "./components/body";
import ResetPassword from "./components/reset-password";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: localStorage.role,
        }
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} key="login" />
                    <Route exact path="/forgot-password" component={ForgotPassword} key="forgotPassword" />
                    <Route exact path="/reset-password/:id" component={ResetPassword} key="resetPassword" />
                    <Route exact path="/register" component={Register} key="register" />
                    <PrivateRoute
                        path=''
                        component={Body}
                    />
                    {/*{*/}
                    {/*    this.state.role === 'admin'?*/}
                    {/*        <Redirect*/}
                    {/*            to='/user-list'*/}
                    {/*        />*/}
                    {/*        :*/}
                    {/*        <Redirect*/}
                    {/*            to='/user-reports'*/}
                    {/*        />*/}
                    {/*}*/}
                    <Redirect
                        to='/'
                    />
                </Switch>
            </Router>
        );
    }
}
export default App;
