import React from 'react';
import {
    reset,
    forgotPassword,
} from "../redux/actions/users/registration";
import '../assets/css/login.css';
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from "../components/reset-password";

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.tmr = null;
        this.state = {
            email: '',
            flag: false,
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.msg_registration && prevProps.msg_registration !== this.props.msg_registration) {
            window.location.href = '/reset-password/' + this.props.msg_registration;
        }
        if(this.props.msg_user_error && prevProps.msg_user_error !== this.props.msg_user_error) {
            toast(this.props.msg_user_error);
            const {
                reset
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                reset();
                this.tmr = null;
            }, 1500);
        }
    };

    send = () => {
        const {
            forgotPassword
        } = this.props;

        const data = {
            email: this.state.email,
        };
        forgotPassword(data);
    };
    back = () => {
        this.props.history.push('/login');
    };
    onInput = (code) => {
        if (code === 13) {
            if (document.activeElement.id === 'email' && this.state.email !== '') {
                this.send();
            }
        }
    };
    render() {
        return (
            <>
                <div>
                    <ToastContainer/>
                </div>
                <div className={"spinning-curtain"} style={{display: this.props.spinning ? "flex" : "none"}}>
                    <div className="lds-dual-ring"/>
                </div>
                <div className="admin-login-bg">
                    <div className="login-body">
                        <div className="pb-30 align-center txt-20 txt-bold col-heavyDark">
                            Forgot Password
                        </div>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="mt-20"
                            value={this.state.email}
                            onChange={(event) => this.setState({email: event.target.value})}
                            onKeyUp={e => this.onInput(e.keyCode)}
                            required
                        />
                        <div className="flex-space">
                            <div className="mt-20 btn-common forgot txt-16 col-white justify-center mouse-cursor" onClick={this.back}>
                                BACK
                            </div>
                            <div className="mt-20 btn-common forgot txt-16 col-white justify-center mouse-cursor" onClick={this.send}>
                                SEND
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.flag && (
                        <ResetPassword
                            email={this.state.email}
                        />
                    )
                }
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
        forgotPassword
    }
)(ForgotPassword);
