import React, {Component} from 'react';
import '../assets/css/dashboard.css';
import {connect} from "react-redux";
import {
    reset,
    deleteUser,
} from "../redux/actions/users/publisher";
import {toast} from "react-toastify";

class DeleteUser extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.msg_user_delete && prevProps.msg_user_delete !== this.props.msg_user_delete) {
            toast(this.props.msg_user_delete);
            const {
                reset,
                handleClose,
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                reset();
                this.tmr = null;

                handleClose();
                window.location.href = "/user-list";
            }, 2000);
        }
    }

    Cancel = () => {
        const {
            handleClose
        } = this.props;

        handleClose();
    };

    onDelete = (_id) => {
        const data = {
            role_id: localStorage.id,
            id: _id,
        };
        const {
            deleteUser
        } = this.props;
        deleteUser(data);
    };

    render() {
        const showHideClassName = this.props.show ? "modal-b display-modal-block" : "modal-b display-modal-none";
        return (
            <div className={showHideClassName}>

                <section className="modal-article">
                    <div className="create-modal-header txt-20 justify-left col-white">Delete User</div>

                    <div className="pt-30 pb-30 txt-18 justify-center">Do you want to delete this user really?</div>

                    <div className="flex-grid2 modal-grid2-gaps modal-p">
                        <div className="btn-common mouse-cursor justify-center col-white" onClick={this.Cancel}>Cancel</div>
                        <div className="btn-common mouse-cursor justify-center col-white" onClick={() => this.onDelete(this.props.id)}>Delete</div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        msg_user_delete: state.users.msg_user_delete,
    }
};

export default connect(
    mapStateToProps,
    {
        reset,
        deleteUser,
    }
)(DeleteUser);

