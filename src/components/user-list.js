import React, { Component } from 'react';
import {connect} from "react-redux";
import {
    reset,
    getUserList,
} from "../redux/actions/users/publisher";
import {
    resetManagement,
    updatePaid,
} from "../redux/actions/users/management";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteUser from "./modal-delete-user";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getUser_list: '',
            current_page: 1,
            page_neighbours: 2,
            pagination: 10,
            page_num: '',

            delete_id: '',
            show: false,
            flag_edit: false,
            paid_amount: '',
            user_id: '',
        };
    }

    componentDidMount() {
        if(!localStorage.id) {
            window.location.href = '/login';
        }
        this.onUserList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.getUser_list && this.props.getUser_list !== prevProps.getUser_list) {
            this.setState({
                getUser_list: this.props.getUser_list.list,
                page_num: this.props.getUser_list.page_num,
            })
        }

        if(this.props.msg_get_users && this.props.msg_get_users !== prevProps.msg_get_users) {
            toast(this.props.msg_get_users);
            const {
                reset
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                reset();
                this.tmr = null;
            }, 2000);
            //this.onInitial();
        }

        if(this.props.msg_paid && this.props.msg_paid !== prevProps.msg_paid) {
            toast(this.props.msg_paid);
            const {
                resetManagement
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                resetManagement();
                this.tmr = null;
            }, 2000);
            this.onUserList();
            //this.onInitial();
        }
    }

    onUserList = () => {
        const {
            getUserList
        } = this.props;
        if(getUserList) {
            const data = {
                role_id: localStorage.id,
                current_page: this.state.current_page,
                page_neighbours: this.state.page_neighbours,
                pagination: this.state.pagination,
            };
            getUserList(data);
        }
    };
    onPageClick = (item) => {
        this.setState({
            current_page: item,
        });

        const {
            getUserList
        } = this.props;

        const data = {
            role_id: localStorage.id,
            current_page: item,
            page_neighbours: this.state.page_neighbours,
            pagination: this.state.pagination,
        };

        if(getUserList) {
            getUserList(data)
        }
        window.scrollTo(0, 0);
    };
    onEdit = (e) => {
        this.props.history.push("/add-user/" + e);
    };
    showModal = (e) => {
        this.setState({
            delete_id: e,
            show: true,
        })
    };
    hideModal = () => {
        this.setState({ show: false });
    };
    onView = (id) => {
        this.props.history.push('/publisher/albums/' + id);
    };

    onPaymentEdit = (item, amount, id) => {
        this.setState({
            user_id: id,
            flag_edit: item,
            paid_amount: '',
        })
    };

    onUpdate = () => {
        const {
            updatePaid,
        } = this.props;
        if(updatePaid) {
            const data = {
                role_id: localStorage.id,
                publisher_id: this.state.user_id,
                paid_amount: this.state.paid_amount,
            };
            updatePaid(data);
        }
        this.setState({
            flag_edit: '',
            paid_amount: '',
            user_id: '',
        })
    };
    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value || 0,
        })
    };
    onInputAlbumId = (code) => {
        if (code === 13) {
            this.onUpdate();
        }
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
                <ToastContainer />
                <div className="col-darkBlue txt-30 txt-bold pb-20 pl-40">
                    User List
                </div>
                <div className="form-bg">
                    <div className="table-p">
                        <table className="tList">
                            <thead>
                            <tr className="table-list">
                                <th>No</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Country</th>
                                <th>Bank Info</th>
                                <th>Registered</th>
                                <th>Paid</th>
                                <th>Owed</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.getUser_list && this.state.getUser_list.map((item, key) => {
                                    return (
                                        <tr key={key} className="table-list">
                                            <td>{key + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.email}</td>
                                            <td>{item.country}</td>
                                            <td>{item.bank_info}</td>
                                            <td>
                                                {
                                                    new Date(item.registered_date).toLocaleString([], {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    })
                                                }
                                            </td>
                                            <td>
                                                <div>
                                                    {
                                                        item.current_paid? item.current_paid: 0 + this.state.flag_edit === item.name ? " + ": ''
                                                    }
                                                </div>
                                                <div>
                                                    {
                                                        this.state.flag_edit === item.name &&
                                                        <input
                                                            id="paid_amount"
                                                            type="Number"
                                                            className="price-paid"
                                                            value={this.state.paid_amount}
                                                            onChange={(e) => this.onChange(e)}
                                                            onKeyUp={e => this.onInputAlbumId(e.keyCode)}
                                                        />
                                                    }
                                                </div>
                                            </td>
                                            <td className="col-paragraphBg txt-bold">{item.owed_amount? item.owed_amount: 0}</td>
                                            <td>{item.total_amount? item.total_amount: 0}</td>
                                            <td className="flex-common">
                                                {
                                                    this.state.flag_edit === item.name?
                                                        <div
                                                            className="mr-10 mouse-cursor icon-flex tooltip"
                                                            onClick={this.onUpdate}
                                                        >
                                                            <img
                                                                className="icon-size"
                                                                src={require("../assets/images/update.svg")}
                                                                alt="" />
                                                            <span className="tooltiptext">Update the paid amount</span>
                                                        </div>
                                                        :
                                                        <div
                                                            className="mr-10 mouse-cursor icon-flex tooltip"
                                                            onClick={(e) => this.onPaymentEdit(item.name, item.current_paid, item._id)}
                                                        >
                                                            <img
                                                                className="icon-size"
                                                                src={require("../assets/images/edit.svg")}
                                                                alt=""/>
                                                            <span className="tooltiptext">Edit the current payment</span>
                                                        </div>
                                                }

                                                <div
                                                    className="mr-10 mouse-cursor icon-flex tooltip"
                                                    onClick={(e) => this.onView(item._id)}
                                                >
                                                    <img
                                                        className="icon-size"
                                                        src={require("../assets/images/view.svg")}
                                                        alt="" />
                                                    <span className="tooltiptext">View the album list and payment history</span>
                                                </div>
                                                <div
                                                    className="mr-10 mouse-cursor icon-flex tooltip"
                                                    onClick={(e) => this.onEdit(item._id)}
                                                >
                                                    <img
                                                        className="icon-size"
                                                        src={require("../assets/images/settings.svg")}
                                                        alt="" />
                                                    <span className="tooltiptext">Edit the publisher profile</span>
                                                </div>
                                                <div
                                                    className="mouse-cursor icon-flex tooltip"
                                                    onClick={(e) => this.showModal(item._id)}
                                                >
                                                    <img
                                                        className="icon-size"
                                                        src={require("../assets/images/bin-28.svg")}
                                                        alt="" />
                                                    <span className="tooltiptext">Delete the publisher</span>
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
                            <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.60496 14.6383C9.42024 14.6383 9.23359 14.5779 9.07773 14.457L0.923018 8.02084C0.724826 7.86414 0.609375 7.62814 0.609375 7.37704C0.609375 7.12782 0.724826 6.88993 0.923018 6.73512L9.0431 0.332906C9.40485 0.047818 9.934 0.104458 10.2246 0.459402C10.5151 0.814346 10.4574 1.33355 10.0956 1.61863L2.79141 7.37704L10.1322 13.1713C10.4939 13.4564 10.5517 13.9756 10.2611 14.3305C10.0937 14.5326 9.85126 14.6383 9.60496 14.6383Z" fill="black" fillOpacity="0.65"/>
                            </svg>
                        </div>

                        {
                            this.state.page_num && pageArray && pageArray.map((item, key) => {
                                return (
                                    <div
                                        className={this.state.current_page && this.state.current_page === item? "product-btn justify-center btn-search": "product-btn justify-center col-darkBlue"}
                                        key={key}
                                        onClick={() => this.onPageClick(item)}
                                    >
                                        {item}
                                    </div>
                                )
                            })
                        }

                        <div className="product-btn justify-center" onClick={() => this.onPageClick(this.state.page_num.total_page)}>
                            <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.39506 14.6383C1.57978 14.6383 1.76643 14.5779 1.92229 14.457L10.077 8.02084C10.2752 7.86414 10.3906 7.62814 10.3906 7.37704C10.3906 7.12782 10.2752 6.88993 10.077 6.73512L1.95692 0.332906C1.59518 0.047818 1.06603 0.104458 0.775474 0.459402C0.484922 0.814346 0.542647 1.33355 0.904394 1.61863L8.2086 7.37704L0.867834 13.1713C0.506087 13.4564 0.448362 13.9756 0.738914 14.3305C0.906319 14.5326 1.14877 14.6383 1.39506 14.6383Z" fill="black" fillOpacity="0.65"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {/*  Modal  */}
                <DeleteUser
                    show={this.state.show}
                    id={this.state.delete_id}
                    handleClose={this.hideModal}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        spinning: state.users.spinning,
        getUser_list: state.users.getUser_list,
        msg_get_users: state.users.msg_get_users,
        msg_paid: state.users.msg_paid,
    }
};

export default connect(
    mapStateToProps,
    {
        reset,
        getUserList,

        resetManagement,
        updatePaid,
    }
)(UserList);