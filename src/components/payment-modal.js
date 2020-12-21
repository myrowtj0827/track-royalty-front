import React, {Component} from 'react';
import '../assets/css/dashboard.css';
import {connect} from "react-redux";
import {
    resetManagement,
    updatePaid,
} from "../redux/actions/users/management";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
class PaymentUpdate extends Component {
    constructor(props) {
        super(props);
        this.tmr = null;
        this.state = {
            paid_amount: '',
            detail: '',
            paid_date: new Date(),
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.msg_paid && prevProps.msg_paid !== this.props.msg_paid) {
            toast(this.props.msg_paid);
            const {
                resetManagement,
                handleClose,
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                resetManagement();
                this.tmr = null;
                handleClose();
                window.location.href = "/user-list";
            }, 2000);
            this.setState({
                paid_amount: '',
                detail: '',
                paid_date: new Date(),
            })
        }
    }
    Cancel = () => {
        const {
            handleClose
        } = this.props;
        handleClose();
        this.setState({
            paid_amount: '',
            detail: '',
            paid_date: new Date(),
        })
    };
    onPaymentUpdate = () => {
        const data = {
            role_id: localStorage.id,
            publisher_id: this.props.item._id,
            paid_amount: this.state.paid_amount,
            comments: this.state.detail,
            paid_date: this.state.paid_date,
        };
        const {
            updatePaid
        } = this.props;
        updatePaid(data);
        console.log(data)
    };
    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value || 0,
        })
    };
    handleDate(date) {
        this.setState({
            paid_date: date,
        });
    };
    render() {
        const showHideClassName = this.props.show ? "modal-b display-modal-block" : "modal-b display-modal-none";
        return (
            <div className={showHideClassName}>
                <div className="spinning-curtain" style={{display: this.props.spinning ? "flex" : "none"}}>
                    <div className="lds-dual-ring"/>
                </div>
                <ToastContainer />
                <section className="modal-article">
                    <div className="create-modal-header txt-20 justify-left col-white">Payment</div>
                    <div className="txt-16" style={{padding: 30}}>
                        <div className="pb-10">Payment Amount</div>
                        <div>
                            <input
                                id="paid_amount"
                                type="Number"
                                className="price-paid"
                                value={this.state.paid_amount}
                                onChange={(e) => this.onChange(e)}
                            />
                        </div>
                        <div className="pt-20 pb-10">Paid Date</div>
                        <div>
                            <DatePicker
                                id="paid_date"
                                type="datetime-local"
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className="price-paid"
                                selected={this.state.paid_date}
                                maxDate={new Date().getTime()}
                                timeIntervals="20"
                                onChange={(e) => this.handleDate(e)}
                            />
                        </div>
                        <div className="pt-20 pb-10">
                            Payment Comments
                        </div>
                        <textarea
                            id="detail"
                            value={this.state.detail}
                            className="payment-detail"
                            onChange={(e) => this.onChange(e)}
                        />
                    </div>
                    <div className="flex-grid2 modal-grid2-gaps modal-p">
                        <div className="btn-common mouse-cursor justify-center col-white" onClick={this.Cancel}>Cancel</div>
                        <div className="btn-common mouse-cursor justify-center col-white" onClick={this.onPaymentUpdate}>Ok</div>
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        spinning: state.users.spinning,
        msg_paid: state.users.msg_paid,
    }
};
export default connect(
    mapStateToProps,
    {
        resetManagement,
        updatePaid,
    }
)(PaymentUpdate);

