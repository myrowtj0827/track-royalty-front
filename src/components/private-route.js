import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const PrivateRoute = ({component: Component, auth, ...rest}) => {
    const loggedIn = localStorage.getItem('email');
    console.log("loggedIn = ", loggedIn)

    return (
        <Route
            {...rest}
            render={props =>
                loggedIn !== '' ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login"/>
                )
            }
        />
    )
};

PrivateRoute.propTypes = {
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    // auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
