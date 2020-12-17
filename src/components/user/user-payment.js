import React, { Component } from 'react';
import {connect} from "react-redux";
import '../../assets/css/dashboard.css';
import {
    reset,
    getPublisherById,
} from "../../redux/actions/users/publisher";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserPayment extends Component {
    constructor(props) {
        super(props);
        this.tmr = null;
        this.state = {
            paid_history: '',
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
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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
            this.setState({
                paid_history: this.props.get_user.paid_log.reverse(),
            })
        }
    }

    exportTableToCSV = (filename) => {
        let csv = [];
        let rows = document.querySelectorAll("table tr");

        console.log(rows);

        for (let i = 0; i < rows.length; i++) {
            let row = [], cols = rows[i].querySelectorAll("td, th");

            for (let j = 0; j < cols.length; j++)
                row.push(cols[j].innerText);

            csv.push(row.join(","));
        }

        // Download CSV file
        this.downloadCSV(csv.join("\n"), filename);
    };
    downloadCSV = (csv, filename) => {
        let csvFile;
        let downloadLink;

        // CSV file
        csvFile = new Blob([csv], {type: "text/csv"});

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Hide download link
        downloadLink.style.display = "none";

        // Add the link to DOM
        document.body.appendChild(downloadLink);

        // Click download link
        downloadLink.click();
    };
    render() {
        return (
            <>
                <ToastContainer />
                <div className="col-darkBlue txt-30 txt-bold pb-20 pl-40">
                    Payment History
                </div>
                <div className="form-bg">
                    {
                        this.props.get_user &&
                            <div className="flex-space txt-18 col-heavyDark">
                                <div className="justify-left">
                                    <div>Owed Amount: </div>
                                    <div className="txt-bold" style={{paddingLeft: 20}}>
                                        {
                                            this.props.get_user.owed_amount
                                        }
                                    </div>
                                </div>

                                <div className="justify-left">
                                    <div>Total Amount: </div>
                                    <div className="txt-bold" style={{paddingLeft: 20}}>
                                        {
                                            this.props.get_user.total_amount
                                        }
                                    </div>
                                </div>
                            </div>
                    }
                    <div className="table-p">
                        <table className="tList">
                            <thead>
                            <tr className="table-list">
                                <th>No</th>
                                <th>Paid Amount</th>
                                <th>Paid Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.paid_history && this.state.paid_history.map((item, key) => {
                                    return (
                                        <tr key={key} className="table-list">
                                            <td>{key + 1}</td>
                                            <td>{item.paid_amount}</td>
                                            <td>{new Date(item.paid_date).toLocaleString()}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>

                    <div className="flex-space mt-30">
                        <div
                            className="btn-common action assign mouse-cursor col-white"
                            onClick={() => window.print("")}
                        >
                            Print
                        </div>
                        <div
                            className="btn-common action assign mouse-cursor col-white"
                            onClick={() => this.exportTableToCSV('members.csv')}
                        >
                            CSV
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
        get_user: state.users.get_user,
        msg_user: state.users.msg_user,
    }
};

export default connect(
    mapStateToProps,
    {
        reset,
        getPublisherById,
    }
)(UserPayment);