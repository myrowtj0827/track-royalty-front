import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import "../assets/css/header.css";
import LogOut from "./logout-modal";
class Header extends Component {
    constructor(props) {
        super(props);
        this.tmr = null;
        this.state = {
            menuVisible: false,
            scrolling: false,
            assignVisible: false,
            userVisible: false,
            show: false,
        };
    }
    assignMenu = () => {
        this.setState({assignVisible: !this.state.assignVisible});
        if(!this.state.assignVisible) {
            this.setState({userVisible: false});
        }
        this.setState({
            menuVisible: false,
        })
    };
    toggleMenu = () => {
        this.setState({menuVisible: !this.state.menuVisible});
    };
    userMenu = () => {
        this.setState({userVisible: !this.state.userVisible});
        if(!this.state.userVisible) {
            this.setState({assignVisible: false});
        }
    };
    componentDidMount() {
        if (!localStorage.id) {
            window.location.href = '/login';
        }
        window.addEventListener('scroll', this.handleScroll, true);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = () => {
        if (window.scrollY > 50) {
            this.setState({scrolling: true});
        }
        else {
            this.setState({scrolling: false});
        }
    };
    onLink = () => {
        this.setState({
            menuVisible: false,
            assignVisible: false,
            userVisible: false,
        })
    };
    showModal = () => {
        this.setState({
            show: true,
        })
    };
    hideModal = () => {
        this.setState({
            show: false,
        })
    };
    render() {
        return (
            <div className={`header-body ${this.state.scrolling ? 'white' : ''}`}>
                <div className={`header-height ${this.state.scrolling ? 'white' : ''}`}>
                    <div className="logo-mw flex-space">
                        <div className={"header-logo"}>
                            <Link
                                className="btn-underLine"
                                to={localStorage.role === "admin"? "/user-list": "/user/reports"}
                            >
                                <div className="col-selected-bg txt-bold">Hi {localStorage.name}</div>
                            </Link>
                        </div>
                        <div className="justify-center">
                            <div className="flex-center">
                                {
                                    localStorage.role === "admin" &&
                                        <>
                                            <div className="btn-navbar mouse-cursor dropdown">
                                                <span>User</span>
                                                {
                                                    this.state.scrolling?
                                                        <img className="drop-icon" src={require("../assets/images/drop-down-black.svg")} alt="drop down" />
                                                        :
                                                        <img className="drop-icon" src={require("../assets/images/drop-down.svg")} alt="drop down" />
                                                }
                                                <div className="dropdown-content">
                                                    <Link className="btn-underLine" to="/add-user">
                                                        <div className="menu-txt mouse-cursor">Add User</div>
                                                    </Link>
                                                    <Link className="btn-underLine" to="/user-list">
                                                        <div className="menu-txt mouse-cursor">User List</div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <Link className="btn-underLine" to="/add-album">
                                                <div className="btn-navbar mouse-cursor">New Album</div>
                                            </Link>
                                            <Link className="btn-underLine" to="/assign-album">
                                                <div className="btn-navbar mouse-cursor">Assign to User</div>
                                            </Link>
                                        </>
                                }

                                {
                                    localStorage.role === 'publisher' &&
                                        <>
                                            <Link className="btn-underLine" to="/user-agreement">
                                                <div className="btn-navbar mouse-cursor">Payment</div>
                                            </Link>
                                            <Link className="btn-underLine" to="/user-reports">
                                                <div className="btn-navbar mouse-cursor">My Reports</div>
                                            </Link>
                                            <Link className="btn-underLine" to="/user-settings">
                                                <div className="btn-navbar mouse-cursor">Profile Settings</div>
                                            </Link>
                                        </>
                                }
                                <div className="btn-underLine btn-navbar mouse-cursor btn-sign" onClick={this.showModal}>Log out</div>
                            </div>
                            <div id="menu" className="justify-center" onClick={this.toggleMenu}>
                                <img className="mobile-menu mouse-cursor"
                                     src={require('../assets/images/mobile-menu.svg')} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.menuVisible && (
                        localStorage.role === "admin"?
                            <div
                                className="menu-container trans-menu"
                                style={{overflowY: 'auto;', maxHeight: '70vh'}}
                            >
                                <div className="btn-underLine">
                                    <div
                                        className="navbar-menu justify-center txt-24 mouse-cursor btn-navbar-bb"
                                        onClick={this.logOut}
                                    >
                                        Log out
                                    </div>
                                </div>
                                <div
                                    className={this.state.userVisible ? "navbar-menu justify-center txt-24 mouse-cursor btn-navbar-bb menu-selectedBg" : "navbar-menu justify-center txt-24 mouse-cursor btn-navbar-bb"}
                                    onClick={this.userMenu}
                                >
                                    User
                                    {
                                        this.state.userVisible ?
                                            <div className="dropdown-icon justify-center">
                                                <img className="down-up-size" src={require("../assets/images/up.svg")} alt='' />
                                            </div>
                                            :
                                            <div className="dropdown-icon">
                                                <img className="down-up-size" src={require("../assets/images/down.svg")} alt='' />
                                            </div>
                                    }
                                </div>
                                {
                                    this.state.userVisible && (
                                        <div>
                                            <Link
                                                to='/add-user'
                                                className="btn-underLine_black secondMenu justify-center menu-txt btn-navbar-bb mouse-cursor"
                                                onClick={this.onLink}
                                            >
                                                <div>Add User</div>
                                            </Link>
                                            <Link
                                                to='/user-list'
                                                className="btn-underLine_black secondMenu justify-center menu-txt btn-navbar-bb mouse-cursor"
                                                onClick={this.onLink}
                                            >
                                                <div>User List</div>
                                            </Link>
                                        </div>
                                    )
                                }
                                <Link
                                    className="btn-underLine"
                                    to="/add-album"
                                >
                                    <div
                                        className="navbar-menu justify-center txt-24 mouse-cursor btn-navbar-bb"
                                        onClick={this.onLink}
                                    >
                                        New Album
                                    </div>
                                </Link>
                                <Link
                                    className="btn-underLine"
                                    to="/assign-album"
                                >
                                    <div
                                        className={this.state.assignVisible ? "navbar-menu justify-center txt-24 mouse-cursor btn-navbar-bb menu-selectedBg" : "navbar-menu justify-center txt-24 mouse-cursor btn-navbar-bb"}
                                        onClick={this.assignMenu}
                                    >
                                        Assign to User
                                    </div>
                                </Link>
                            </div>
                            :
                            <div
                                className="menu-container trans-menu"
                                style={{overflowY: 'auto;', maxHeight: '70vh'}}
                            >
                                <div className="btn-underLine">
                                    <div
                                        className="navbar-menu justify-center txt-24 mouse-cursor btn-navbar-bb"
                                        onClick={this.logOut}
                                    >
                                        Log out
                                    </div>
                                </div>

                                <Link
                                    className="btn-underLine"
                                    to="/user-agreement"
                                >
                                    <div
                                        className="navbar-menu justify-center txt-24 mouse-cursor btn-navbar-bb"
                                        onClick={this.onLink}
                                    >
                                        Payment
                                    </div>
                                </Link>
                                <Link
                                    className="btn-underLine"
                                    to="/user-reports"
                                >
                                    <div
                                        className="navbar-menu justify-center txt-24 mouse-cursor btn-navbar-bb"
                                        onClick={this.assignMenu}
                                    >
                                        My Reports
                                    </div>
                                </Link>
                                <Link
                                    className="btn-underLine"
                                    to="/user-settings"
                                >
                                    <div
                                        className="navbar-menu justify-center txt-24 mouse-cursor btn-navbar-bb"
                                        onClick={this.assignMenu}
                                    >
                                        Profile Settings
                                    </div>
                                </Link>
                            </div>
                    )
                }
            {/*  Modal  */}
            <LogOut
                show={this.state.show}
                handleClose={this.hideModal}
            />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
};
export default connect(
    mapStateToProps,
    {
    }
)(Header);