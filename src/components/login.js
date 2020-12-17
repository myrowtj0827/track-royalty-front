import React from 'react';
import {Link} from "react-router-dom";
import {
    reset,
    login,
} from "../redux/actions/users/registration";

import '../assets/css/login.css';
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.tmr = null;
        this.state = {
            email: '',
            password: '',
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.msg_registration && prevProps.msg_registration !== this.props.msg_registration) {
            toast(this.props.msg_registration);
            const {
                reset
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                reset();
                this.tmr = null;
                window.location.href = '/dashboard';
            }, 1000);

            this.setState({
                email: '',
                password: '',
            })
        }

        if(this.props.msg_user_error && prevProps.msg_user_error !== this.props.msg_user_error) {
            console.log(this.props.msg_user_error);
            let msg = this.props.msg_user_error;
            let msg_array = [];
            if (msg.msg_login_email) {
                msg_array.push(msg.msg_login_email);
            }
            if (msg.msg_login_password) {
                msg_array.push(msg.msg_login_password);
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
            }, 1500);
        }
    }

    login = () => {
        const {
            login,
        } = this.props;
        const data = {
            email: this.state.email,
            password: this.state.password,
        };
        if(login) {
            login(data);
        }
    };

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value || '',
        })
    };

    render() {
        return (
            <>
                <div className="spinning-curtain" style={{display: this.props.spinning ? "flex" : "none"}}>
                    <div className="lds-dual-ring"/>
                </div>
                <div className="admin-login-bg">
                    <ToastContainer />
                    <div className="login-body">
                        <div className="pb-30 align-center txt-20 txt-bold col-heavyDark">
                            Sign In
                        </div>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="mt-20"
                            value={this.state.email}
                            onChange={(e) => this.onChange(e)}
                            required
                        />
                        <input
                            id="password"
                            type="password"
                            placeholder="****"
                            className="mt-20"
                            value={this.state.password}
                            onChange={(e) => this.onChange(e)}
                            required
                        />

                        <div className="btn-common txt-16 col-white justify-center mouse-cursor mt-30" onClick={this.login}>
                            LOGIN
                        </div>

                        <Link to="/forgot-password">
                            <div className="txt-14 col-heavyDark align-center pt-30">Forgot password</div>
                        </Link>
                        <Link to="/register">
                            <div className="txt-14 col-heavyDark align-center pt-10">Don't you have an account yet?</div>
                        </Link>
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
        login,
    }
)(Login);
