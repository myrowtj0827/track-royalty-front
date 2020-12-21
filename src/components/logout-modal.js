import React, {Component} from 'react';
import '../assets/css/dashboard.css';
import {connect} from "react-redux";
import {
    reset,
    logOut,
} from "../redux/actions/users/registration";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class LogOut extends Component {
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
            }, 2000);
        }
    }
    Cancel = () => {
        const {
            handleClose
        } = this.props;
        handleClose();
    };
    logOut = () => {
        const {
            logOut
        } = this.props;
        logOut();
    };
    render() {
        const showHideClassName = this.props.show ? "modal-b display-modal-block" : "modal-b display-modal-none";
        return (
            <div className={showHideClassName}>
                <ToastContainer />
                <section className="modal-article">
                    <div className="create-modal-header txt-20 justify-left col-white">Log Out</div>
                    <div className="pt-30 pb-30 txt-18 justify-center">Do you want to log out really?</div>
                    <div className="flex-grid2 modal-grid2-gaps modal-p">
                        <div className="btn-common mouse-cursor justify-center col-white" onClick={this.Cancel}>Cancel</div>
                        <div className="btn-common mouse-cursor justify-center col-white" onClick={this.logOut}>Ok</div>
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        msg_registration: state.users.msg_registration,
    }
};
export default connect(
    mapStateToProps,
    {
        reset,
        logOut,
    }
)(LogOut);

