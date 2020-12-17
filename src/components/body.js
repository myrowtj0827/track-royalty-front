import React, {Component} from 'react';
import {Redirect, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PrivateRoute from "./private-route";
import Header from "./header";
import AddUser from "./add-user";
import UserList from "./user-list";
import AddAlbum from "./add-album";
import AssignAlbum from "./assign-album";
import AssignTrack from "./assign-track";
import PublisherAlbums from "./publisher-album-list";
import PublisherTracks from "./publisher-track-list";

import UserReports from "./user/user-reports";
import UserAgreement from "./user/user-payment";
import UserTrackList from "./user/user-track-list";
import UserSettings from "./user/user-settings";

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: localStorage.role,
        }
    }

    render() {
        return (
            <>
                <div className={"spinning-curtain"} style={{display: this.props.spinning ? "flex" : "none"}}>
                    <div className="lds-dual-ring"/>
                </div>
                <Header/>

                <div className="body-section">
                    {
                        this.state.role === 'admin' &&
                        <Switch>
                            <PrivateRoute
                                path='/assign-album'
                                component={AssignAlbum}
                            />

                            <PrivateRoute
                                path='/assign-track'
                                component={AssignTrack}
                            />

                            <PrivateRoute
                                path='/add-album'
                                component={AddAlbum}
                            />

                            <PrivateRoute
                                path='/add-user/:id?'
                                component={AddUser}
                            />

                            <PrivateRoute
                                path='/user-list'
                                component={UserList}
                            />

                            <PrivateRoute
                                path='/publisher/albums/:id'
                                component={PublisherAlbums}
                            />

                            <PrivateRoute
                                path='/publisher/tracks/:slug'
                                component={PublisherTracks}
                            />

                            <Redirect
                                to='/user-list'
                            />
                        </Switch>
                    }


                    {
                        this.state.role === 'publisher' &&
                        <Switch>
                            <PrivateRoute
                                path='/user-reports'
                                component={UserReports}
                            />

                            <PrivateRoute
                                path='/user-agreement'
                                component={UserAgreement}
                            />

                            <PrivateRoute
                                path='/user-track-list/:id'
                                component={UserTrackList}
                            />

                            <PrivateRoute
                                path='/user-settings'
                                component={UserSettings}
                            />

                            <Redirect
                                to='/user-reports'
                            />
                        </Switch>
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(
    mapStateToProps,
    {}
)(Body);
