import React, {Component} from 'react';
import {connect} from "react-redux";

import {
    resetList,
    getAssignedAlbumsById,
} from "../../redux/actions/users/get-data-site";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserReports extends Component {
    constructor(props) {
        super(props);

        this.tmr = null;
        this.state = {
            album_list: '',

            current_page: 1,
            page_neighbours: 2,
            pagination: 10,
            page_num: '',
        };
    }

    componentDidMount() {
        this.onPageClick(1);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * Getting album list
         */
        if (this.props.get_registered_albums && this.props.get_registered_albums !== prevProps.get_registered_albums) {
            this.setState({
                album_list: this.props.get_registered_albums.list,
                page_num: this.props.get_registered_albums.page_num,
            });

            console.log(this.props.get_registered_albums)
        }
        if (this.props.msg_registered_albums && this.props.msg_registered_albums !== prevProps.msg_registered_albums) {
            toast(this.props.msg_registered_albums);
            const {
                resetList
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                resetList();
                this.tmr = null;
            }, 3000);
        }
    }

    onPageClick = (item) => {
        this.setState({
            current_page: item,
        });

        const {
            getAssignedAlbumsById
        } = this.props;

        const data = {
            id: localStorage.id,
            current_page: item,
            page_neighbours: this.state.page_neighbours,
            pagination: this.state.pagination,
        };

        if (getAssignedAlbumsById) {
            getAssignedAlbumsById(data)
        }
        this.setState({
            allChecked: false,
            new_checked: [],
        })
    };

    onView = (id) => {
        this.props.history.push('/user-track-list/' + id);
    };

    render() {
        const pageArray = [];
        if(this.state.page_num) {
            for (let k = this.state.page_num.start_page; k <= this.state.page_num.end_page; k ++) {
                pageArray.push(k);
            }
        }
        return (
            <>
                <div className="spinning-curtain" style={{display: this.props.spinning ? "flex" : "none"}}>
                    <div className="lds-dual-ring"/>
                </div>
                <ToastContainer/>
                <div className="col-darkBlue txt-30 txt-bold pb-20 pl-40">
                    Assigned Albums
                </div>
                <div className="form-bg">
                    <div className="flex-space assign">
                        <div
                            className="btn-common action assign mouse-cursor col-white"
                            onClick={() => this.props.history.goBack()}
                        >
                            Back
                        </div>
                    </div>
                    <div className="table-p">
                        <table className="tList">
                            <thead>
                            <tr className="table-list">
                                <th>No</th>
                                <th>Album ID</th>
                                <th>Name</th>
                                <th>Artists</th>
                                <th>Tracks</th>
                                <th>Assigned Date</th>
                                <th>Image</th>
                                <th>Total Amount</th>
                                <th>View</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.album_list && this.state.album_list.map((item, key) => {
                                    return (
                                        <tr key={key} className="table-list">
                                            <td>{key + 1}</td>
                                            <td>{this.state.album_list[key].album_id}</td>
                                            <td>{this.state.album_list[key].name}</td>
                                            <td>{this.state.album_list[key].artists.length}</td>
                                            <td>{this.state.album_list[key].tracks.length}</td>
                                            <td>
                                                {
                                                    new Date(this.state.album_list[key].updated_date).toLocaleString()
                                                }
                                            </td>
                                            <td
                                                className="mouse-cursor"
                                                onClick={() => window.location = this.state.album_list[key].path}
                                            >
                                                {
                                                    this.state.album_list[key].thumbnail && (
                                                        <img className="thumbnail-size" src={this.state.album_list[key].thumbnail} alt="" />
                                                    )
                                                }
                                            </td>
                                            <td className="col-heavyDark txt-bold">{this.state.album_list[key].total_amount}</td>
                                            <td>
                                                <div
                                                    className="mr-10 mouse-cursor icon-flex tooltip"
                                                    onClick={(e) => this.onView(this.state.album_list[key].album_id.toString())}
                                                >
                                                    <img
                                                        className="icon-size"
                                                        src={require("../../assets/images/view.svg")}
                                                        alt="" />
                                                    <span className="tooltiptext">View the track list</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>

                    <div className="help-center-align">
                        <div className="product-btn justify-center" onClick={() => this.onPageClick(1)}>
                            <svg width="11" height="15" viewBox="0 0 11 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.60496 14.6383C9.42024 14.6383 9.23359 14.5779 9.07773 14.457L0.923018 8.02084C0.724826 7.86414 0.609375 7.62814 0.609375 7.37704C0.609375 7.12782 0.724826 6.88993 0.923018 6.73512L9.0431 0.332906C9.40485 0.047818 9.934 0.104458 10.2246 0.459402C10.5151 0.814346 10.4574 1.33355 10.0956 1.61863L2.79141 7.37704L10.1322 13.1713C10.4939 13.4564 10.5517 13.9756 10.2611 14.3305C10.0937 14.5326 9.85126 14.6383 9.60496 14.6383Z"
                                    fill="black" fillOpacity="0.65"/>
                            </svg>
                        </div>

                        {
                            this.state.page_num && pageArray && pageArray.map((item, key) => {
                                return (
                                    <div
                                        className={this.state.current_page && this.state.current_page === item ? "product-btn justify-center btn-search" : "product-btn justify-center col-darkBlue"}
                                        key={key}
                                        onClick={() => this.onPageClick(item)}
                                    >
                                        {item}
                                    </div>
                                )
                            })
                        }

                        <div className="product-btn justify-center"
                             onClick={() => this.onPageClick(this.state.page_num.total_page)}>
                            <svg width="11" height="15" viewBox="0 0 11 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.39506 14.6383C1.57978 14.6383 1.76643 14.5779 1.92229 14.457L10.077 8.02084C10.2752 7.86414 10.3906 7.62814 10.3906 7.37704C10.3906 7.12782 10.2752 6.88993 10.077 6.73512L1.95692 0.332906C1.59518 0.047818 1.06603 0.104458 0.775474 0.459402C0.484922 0.814346 0.542647 1.33355 0.904394 1.61863L8.2086 7.37704L0.867834 13.1713C0.506087 13.4564 0.448362 13.9756 0.738914 14.3305C0.906319 14.5326 1.14877 14.6383 1.39506 14.6383Z"
                                    fill="black" fillOpacity="0.65"/>
                            </svg>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        spinning: state.users.spinning,
        get_registered_albums: state.users.get_registered_albums,
        msg_registered_albums: state.users.msg_registered_albums,

        msg_assign_albums: state.users.msg_assign_albums,
        msg_error_assign_albums: state.users.msg_error_assign_albums,
    }
};

export default connect(
    mapStateToProps,
    {
        resetList,
        getAssignedAlbumsById,
    }
)(UserReports);