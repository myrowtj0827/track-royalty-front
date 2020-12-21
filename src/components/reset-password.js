import React, { Component } from 'react';
import {
    reset,
    resetPassword,
} from "../redux/actions/users/registration";
import '../assets/css/login.css';
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.tmr = null;
        this.state = {
            password: '',
            confirm_password: '',
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
                window.location.href = '/login';
            }, 3000);

            this.setState({
                email: '',
                password: '',
            })
        }
        if(this.props.msg_user_error && prevProps.msg_user_error !== this.props.msg_user_error) {
            console.log(this.props.msg_user_error);
            let msg = this.props.msg_user_error;
            let msg_array = [];
            if (msg.password) {
                msg_array.push(msg.password);
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
    resetPassword = () => {
        const {
            resetPassword,
        } = this.props;
        const data = {
            id: this.props.match.params.id,
            password: this.state.password,
            confirm_password: this.state.confirm_password,
        };
        if(resetPassword) {
            resetPassword(data);
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
                           Reset Password
                        </div>
                        <div className="mt-20 col-buttonAndLink">Password</div>
                        <input
                            id="password"
                            type="password"
                            placeholder="***"
                            value={this.state.password}
                            onChange={(e) => this.onChange(e)}
                            required
                        />
                        <div className="mt-20 col-buttonAndLink">Confirm Password</div>
                        <input
                            id="confirm_password"
                            type="password"
                            placeholder="****"
                            value={this.state.confirm_password}
                            onChange={(e) => this.onChange(e)}
                            required
                        />
                        <div className="flex-space">
                            <div className="mt-20 btn-common forgot txt-16 col-white justify-center mouse-cursor" onClick={this.props.history.goBack}>
                                BACK
                            </div>
                            <div className="mt-20 btn-common forgot txt-16 col-white justify-center mouse-cursor" onClick={this.resetPassword}>
                                SEND
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
        resetPassword,
    }
)(ResetPassword);
