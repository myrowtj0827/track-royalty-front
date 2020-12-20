import React, { Component } from 'react';
import {connect} from "react-redux";
import '../assets/css/login.css';
import {
    reset,
    registerUser,
} from "../redux/actions/users/registration";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Register extends Component {
    constructor(props) {
        super(props);
        this.tmr = null;
        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            accept_state: false,
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.msg_registration && prevProps.msg_registration !== this.props.msg_registration) {
            toast(this.props.msg_registration);
            const {
                reset
            } = this.props;

            this.tmr = setTimeout(function () {
                reset();
                this.tmr = null;
                window.location.href = '/login';
                clearTimeout(this.tmr);
            }, 2000);

            this.setState({
                name: '',
                email: '',
                password: '',
                confirm_password: '',
                accept_state: false,
            })
        }

        if(this.props.msg_user_error && prevProps.msg_user_error !== this.props.msg_user_error) {
            console.log(this.props.msg_user_error);
            let msg = this.props.msg_user_error;
            let msg_array = [];
            if (msg.name) {
                msg_array.push(msg.name);
            }
            if (msg.email) {
                msg_array.push(msg.email);
            }
            if (msg.password) {
                msg_array.push(msg.password);
            }
            if (msg.accept_state) {
                msg_array.push(msg.accept_state);
            }
            if(msg_array.length === 0) {
                toast(this.props.msg_user_error);
            } else {
                for (let k = 0; k < msg_array.length; k ++) {
                    toast(msg_array[k]);
                }
            }
            const {
                reset
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                reset();
                this.tmr = null;
            }, 6000);
        }
    };

    acceptChange = () => {
        this.setState({accept_state: !this.state.accept_state});
    };
    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value || '',
        })
    };

    register = () => {
        const {
            registerUser,
        } = this.props;
        const data = {
            role: 'admin',
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirm_password,
            accept_state: this.state.accept_state? 'true': '',
        };
        if(registerUser) {
            registerUser(data);
        }
    };

    render() {
        return (
            <>
                <div className={"spinning-curtain"} style={{display: this.props.spinning ? "flex" : "none"}}>
                    <div className="lds-dual-ring"/>
                </div>
                <div>
                    <ToastContainer/>
                </div>

                <div className="admin-login-bg">
                    <div className="register-body">
                        <div className="pb-30 align-center txt-20 txt-bold col-heavyDark">
                            Sign Up
                        </div>

                        <input
                            id='name'
                            type="text"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={(event) => this.onChange(event)}
                            className="mt-20"
                            required
                        />

                        <input
                            id='email'
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={(event) => this.onChange(event)}
                            className="mt-20"
                            required
                        />

                        <input
                            id='password'
                            type="password"
                            className="mt-20"
                            placeholder="****"
                            value={this.state.password}
                            onChange={(event) => this.onChange(event)}
                            required
                        />

                        <input
                            id='confirm_password'
                            type="password"
                            className="mt-20"
                            placeholder="Confirm Password"
                            value={this.state.confirm_password}
                            onChange={(event) => this.onChange(event)}
                            required
                        />

                        <div className="pt-20 pb-10">
                            <label className="container-event align-left">
                                <span className="txt-16 col-darkBlue">
                                    <span className="col-part-bg">I accept the</span>
                                    Terms of Service
                                </span>
                                <input
                                    type="checkbox"
                                    defaultChecked={this.state.accept_state}
                                    onChange={this.acceptChange}
                                    required
                                />
                                <span className="checkMark"/>
                            </label>
                        </div>

                        <div className="flex-space">
                            <div className="mt-20 btn-common forgot txt-16 col-white justify-center mouse-cursor" onClick={this.props.history.goBack}>
                                BACK
                            </div>
                            <div className="mt-20 btn-common forgot txt-16 col-white justify-center mouse-cursor" onClick={this.register}>
                                REGISTER
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        spinning: state.users.spinning,
        msg_registration: state.users.msg_registration,
        msg_user_error: state.users.msg_user_error,
    }
};

export default connect(
    mapStateToProps,
    {
        reset,
        registerUser,
    }
)(Register);