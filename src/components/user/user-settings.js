import React, { Component } from 'react';
import {connect} from "react-redux";
import '../../assets/css/dashboard.css';
import {
    reset,
    updatePublisher,
    getPublisherById,
} from "../../redux/actions/users/publisher";

import CountriesList from "../../components/country-list";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserSettings extends Component {
    constructor(props) {
        super(props);
        this.tmr = null;
        this.state = {
            user_edit: '',
            name: '',
            phone: '',
            email: '',
            password: '',
            confirm_password: '',
            country: 'US',
            bank_info: '',
        };
    }
    componentDidMount() {
        const {
            getPublisherById,
        } = this.props;
        if(getPublisherById) {
            const data = {
                id: localStorage.id,
            };
            getPublisherById(data);
        }
        this.onInitial();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.msg_create_publisher && prevProps.msg_create_publisher !== this.props.msg_create_publisher) {
            toast(this.props.msg_create_publisher);
            const {
                reset
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                reset();
                this.tmr = null;
            }, 2000);
            this.onInitial();
        }

        if(this.props.msg_publisher_error && prevProps.msg_publisher_error !== this.props.msg_publisher_error) {
            console.log(this.props.msg_publisher_error);
            let msg = this.props.msg_publisher_error;
            let msg_array = [];
            if (msg.name) {
                msg_array.push(msg.name);
            }
            if (msg.phone) {
                msg_array.push(msg.phone);
            }
            if (msg.email) {
                msg_array.push(msg.email);
            }
            if (msg.password) {
                msg_array.push(msg.password);
            }
            if (msg.confirm_password) {
                msg_array.push(msg.confirm_password);
            }
            if (msg.country) {
                msg_array.push(msg.country);
            }
            if (msg.bank_info) {
                msg_array.push(msg.bank_info);
            }
            if(msg_array.length === 0) {
                toast(this.props.msg_publisher_error);
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

        if(this.props.msg_user && this.props.msg_user !== prevProps.msg_user) {
            toast(this.props.msg_user);
            const {
                reset
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                reset();
                this.tmr = null;
            }, 2000);
            this.onInitial();
        }
        if (this.props.get_user && this.props.get_user !== prevProps.get_user) {
            let user = this.props.get_user;
            this.setState({
                user_edit: user,
                name: user.name,
                phone: user.phone,
                email: user.email,
                password: user.origin_password,
                confirm_password: user.origin_password,
                country: user.country,
                bank_info: user.bank_info,
            })
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value || '',
        })
    };
    onPhoneChange = (e) => {
        this.setState({[e.target.id]: parseFloat(e.target.value || 0)});
    };
    onInitial = () => {
        this.setState({
            name: this.state.user_edit.name,
            phone: this.state.user_edit.phone,
            email: this.state.user_edit.email,
            password: this.state.user_edit.origin_password,
            confirm_password: this.state.user_edit.origin_password,
            country: this.state.user_edit.country,
            bank_info: this.state.user_edit.bank_info,
        })
    };
    onClickInitial = () => {
        this.setState({
            name: this.state.user_edit.name,
            phone: this.state.user_edit.phone,
            email: this.state.user_edit.email,
            password: this.state.user_edit.origin_password,
            confirm_password: this.state.user_edit.origin_password,
            country: this.state.user_edit.country,
            bank_info: this.state.user_edit.bank_info,
        })
    };
    onSelectCountry = (e) => {
        this.setState({
            country: e.target.value,
        });
    };

    onUpdate = () => {
        const {
            updatePublisher
        } = this.props;

        if(updatePublisher) {
            const data = {
                id: localStorage.id,
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email,
                password: this.state.password,
                confirm_password: this.state.confirm_password,
                country: this.state.country,
                bank_info: this.state.bank_info,
            };
            updatePublisher(data);
        }
    };
    render() {
        return (
            <>
                <ToastContainer />
                <div className="col-darkBlue txt-30 txt-bold pb-20 pl-40">
                    Edit Profile
                </div>
                <div className="form-bg">
                    <input
                        id="name"
                        type="text"
                        className="mt-20"
                        placeholder="User Name"
                        value={this.state.name}
                        onChange={(e) => this.onChange(e)}
                        required
                    />
                    <input
                        id="phone"
                        type="tel"
                        className="mt-20"
                        placeholder="Phone Number"
                        value={this.state.phone}
                        onChange={(e) => this.onPhoneChange(e)}
                        required
                    />
                    <input
                        id="email"
                        type="email"
                        className="mt-20"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={(e) => this.onChange(e)}
                        required
                    />
                    <input
                        id="password"
                        type="password"
                        className="mt-20"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(e) => this.onChange(e)}
                        required
                    />
                    <input
                        id="confirm_password"
                        type="password"
                        className="mt-20"
                        placeholder="Confirm Password"
                        value={this.state.confirm_password}
                        onChange={(e) => this.onChange(e)}
                        required
                    />
                    <select
                        className="mt-20"
                        value={this.state.country}
                        onChange={(e) => this.onSelectCountry(e)}
                    >
                        <CountriesList/>
                    </select>
                    <input
                        id="bank_info"
                        type="text"
                        className="mt-20"
                        placeholder="Bank Information"
                        value={this.state.bank_info}
                        onChange={(e) => this.onChange(e)}
                        required
                    />
                    <div className="flex-space fields">
                        <div className="flex-space fields mt-20">
                            <div className="btn-common cancel col-white mouse-cursor action" onClick={this.props.history.goBack}>BACK</div>
                            <div className="btn-common initial col-white mouse-cursor action" onClick={this.onClickInitial}>INITIALIZE</div>
                        </div>
                        <div className="btn-common save col-white mouse-cursor" onClick={this.onUpdate}>
                            UPDATE
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
        msg_create_publisher: state.users.msg_create_publisher,
        msg_publisher_error: state.users.msg_publisher_error,
        get_user: state.users.get_user,
        msg_user: state.users.msg_user,
    }
};

export default connect(
    mapStateToProps,
    {
        reset,
        updatePublisher,
        getPublisherById,
    }
)(UserSettings);