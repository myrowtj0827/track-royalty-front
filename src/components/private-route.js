import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
const PrivateRoute = ({component: Component, auth, ...rest}) => {
    const loggedIn = localStorage.getItem('email');
    return (
        <Route
            {...rest}
            render={props =>
                (loggedIn !== '' && loggedIn !== undefined) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login"/>
                )
            }
        />
    )
};
PrivateRoute.propTypes = {
};

const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(PrivateRoute);
