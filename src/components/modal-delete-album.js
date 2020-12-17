import React, {Component} from 'react';
import '../assets/css/dashboard.css';
import {connect} from "react-redux";
import {
    reset,
    deleteAlbum,
    deleteTrack,
} from "../redux/actions/users/get-data-site";
import {toast} from "react-toastify";

class DeleteAlbum extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.msg_album_delete && prevProps.msg_album_delete !== this.props.msg_album_delete) {
            toast(this.props.msg_album_delete);
            const {
                reset,
                handleClose,
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                reset();
                this.tmr = null;

                handleClose();
                window.location.href = "/add-album";
            }, 2000);
        }
    }

    Cancel = () => {
        const {
            handleClose
        } = this.props;

        handleClose();
    };

    onDelete = (albums) => {
        if(this.props.flag === false) {
            const data = {
                role_id: localStorage.id,
                albums: albums,
                language: this.props.lang,
            };
            const {
                deleteAlbum,
            } = this.props;
            deleteAlbum(data);
        } else {
            const data = {
                role_id: localStorage.id,
                id: this.props.id,
                tracks: albums,
                language: this.props.lang,
            };
            const {
                deleteTrack,
            } = this.props;
            deleteTrack(data);
        }

    };

    render() {
        const showHideClassName = this.props.show ? "modal-b display-modal-block" : "modal-b display-modal-none";
        return (
            <div className={showHideClassName}>

                <section className="modal-article">
                    <div className="create-modal-header txt-20 justify-left col-white">Cancel {this.props.flag? "Track ": "Album "}' Registration</div>

                    <div className="pt-30 pb-30 txt-18 justify-center">Would you like to unregister these {this.props.flag? "tracks": "albums"}?</div>

                    <div className="flex-grid2 modal-grid2-gaps modal-p">
                        <div className="btn-common mouse-cursor justify-center col-white" onClick={this.Cancel}>Cancel</div>
                        <div className="btn-common mouse-cursor justify-center col-white" onClick={() => this.onDelete(this.props.albums)}>Unregister</div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        msg_album_delete: state.users.msg_album_delete,
    }
};

export default connect(
    mapStateToProps,
    {
        reset,
        deleteAlbum,
        deleteTrack,
    }
)(DeleteAlbum);

