import React from 'react';
import {connect} from "react-redux";
import "../../assets/css/dashboard.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    reset,
    getTrackListById,
} from "../../redux/actions/users/management";

class UserTrackList extends React.Component {
    constructor(props) {
        super(props);
        this.tmr = null;
        this.state = {
            role: localStorage.role,
            user_id: localStorage.id,
            listById: '',

            table_show: true,
            detail_show: false,
            detail_item: '',
        };
    }
    componentDidMount() {
        this.getInitialTrackList();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.get_track_list && this.props.get_track_list !== prevProps.get_track_list) {
            this.setState({
                listById: this.props.get_track_list,
            });
        }
        if (this.props.msg_error_tracks && this.props.msg_error_tracks !== prevProps.msg_error_tracks) {
            toast(this.props.msg_error_tracks);
            const {
                reset,
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                reset();
                this.tmr = null;
            }, 3000);
        }
    }
    getInitialTrackList = () => {
        const {
            getTrackListById
        } = this.props;
        if (getTrackListById) {
            let path = this.props.match.params && this.props.match.params.id;
            const data = {
                user_id: this.state.user_id,
                album_id: path,
            };
            getTrackListById(data);
        }
    };
    onShowTableContents = () => {
        this.setState({
            table_show: !this.state.table_show,
        })
    };
    onShowDetail = (item) => {
        this.setState({
            table_show: false,
            detail_show: true,
            detail_item: item,
        })
    };
    exportTableToCSV = (filename) => {
        let csv = [];
        let rows = document.querySelectorAll("table tr");
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
                <div className="spinning-curtain" style={{display: this.props.spinning ? "flex" : "none"}}>
                    <div className="lds-dual-ring"/>
                </div>
                <ToastContainer />
                <div className="col-darkBlue txt-30 txt-bold pb-20 pl-40">
                    Track List
                </div>
                <div className="form-bg">
                    <div className="flex-space album-list">
                        <div
                            className="btn-common action mouse-cursor col-white mr-id-10"
                            onClick={() => this.props.history.goBack()}
                        >
                            Back
                        </div>
                    </div>

                    {
                        this.state.listById && (
                            <div className="flex-grid2 album-grid">
                                <div className="album-grid-mt">
                                    <img
                                        className="album-img mouse-cursor"
                                        src={this.state.listById.album.full_thumbnail}
                                        onClick={() => window.location = this.state.listById.album.path}
                                        alt="" />
                                </div>
                                <div className="album-grid-mt justify-center col-darkBlue">
                                    <div>
                                        <div className="justify-center">
                                            <img
                                                className="album-thumbnail-img mouse-cursor"
                                                src={this.state.listById.album.thumbnail}
                                                onClick={() => window.location = this.state.listById.album.path}
                                                alt=""
                                            />
                                        </div>
                                        <div className="pt-10 justify-center txt-bold txt-20">
                                            Title:
                                        </div>
                                        <div className="justify-center">
                                            {this.state.listById.album.name}
                                        </div>
                                        <div className="pt-10 justify-center txt-bold txt-20">
                                            Artists:
                                        </div>
                                        <table className="tList">
                                            <thead>
                                            <tr className="table-list album">
                                                <th>No</th>
                                                <th>Id</th>
                                                <th>Name</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.listById && this.state.listById.album.artists.map((item, key) => {
                                                    return (
                                                        <tr key={key} className="align-left">
                                                            <td style={{paddingLeft: 20}}>
                                                                {key + 1}
                                                            </td>
                                                            <td style={{paddingLeft: 20}}>
                                                                {item.id}
                                                            </td>
                                                            <td style={{paddingLeft: 20}}>
                                                                {item.title}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div>
                        <div className="pt-30 pb-10 justify-center col-paragraphBg txt-20">Tracks</div>
                    </div>
                    <div className="table-p">
                        <table className="tList">
                            <thead>
                            <tr
                                className="table-list album mouse-cursor"
                                onClick={this.onShowTableContents}
                            >
                                <th>No</th>
                                <th>Title</th>
                                <th>Url</th>
                                <th>Download</th>
                                <th>Current Price(Usd)</th>
                                <th>Total Amount</th>
                                <th>Detail View</th>
                            </tr>
                            </thead>
                            {
                                this.state.table_show &&
                                <tbody>
                                {
                                    this.state.listById && this.state.listById.tracks.map((item, key) => {
                                        return (
                                            <tr key={key} className="table-list album">
                                                <td>{key + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.url}</td>
                                                <td>{item.download === "" || item.download === null? 0: item.download}</td>
                                                <td>{item.amount_per_one}</td>
                                                <td>{item.total_amount? item.total_amount: 0}</td>
                                                <td>
                                                    <div
                                                        className="mr-10 mouse-cursor icon-flex tooltip"
                                                        onClick={(e) => this.onShowDetail(item)}
                                                    >
                                                        <img
                                                            className="icon-size"
                                                            src={require("../../assets/images/view.svg")}
                                                            alt="" />
                                                        <span className="tooltiptext">View the detailed info</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            }
                        </table>
                    </div>

                    {/* Detail Show*/}
                    {
                        this.state.detail_show &&
                        <>
                            <div style={{marginTop: 70}}>
                                <div className="pt-20 pb-20 justify-center col-selected-bg txt-20">
                                    Detailed view of track "{this.state.detail_item.name}"
                                </div>
                            </div>
                            <div className="mt-30 justify-center col-darkBlue txt-bold txt-20">Track History</div>
                            <div className="table-p">
                                <table className="tList">
                                    <thead className="track-list">
                                    <tr
                                        className="table-list album"
                                    >
                                        <th>No</th>
                                        <th>Country</th>
                                        <th>Ip Address</th>
                                        <th>Platform</th>
                                        <th>Version</th>
                                        <th>Price Per Played Track</th>
                                        <th>Played Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.detail_item.details.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td style={{paddingLeft: 20}}>{key + 1}</td>
                                                    <td>{item.country}</td>
                                                    <td>{item.ip_address}</td>
                                                    <td>{item.platform? item.platform: ''}</td>
                                                    <td>{item.version? item.version: ''}</td>
                                                    <td>{item.price_per_track}</td>
                                                    <td>
                                                        {
                                                            new Date(item.played_date).toLocaleString([], {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: '2-digit',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                            {/*  CSV & Print Download  */}
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
                        </>
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        spinning: state.users.spinning,
        get_track_list: state.users.get_track_list,
        msg_error_tracks: state.users.msg_error_tracks,
    }
};

export default connect(
    mapStateToProps,
    {
        reset,
        getTrackListById,
    }
)(UserTrackList);