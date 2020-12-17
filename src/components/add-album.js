import React, { Component } from 'react';
import {connect} from "react-redux";
import "../assets/css/dashboard.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    reset,
    getAlbumListFromSite,
    addAlbumFromSite,
    getAlbumByIdFromSite,

    addTrackFromSite,
} from "../redux/actions/users/get-data-site";
import DeleteAlbum from "./modal-delete-album";

class AddAlbum extends Component {
    constructor(props) {
        super(props);
        this.tmr = null;

        this.state = {
            album_list: [],
            new_checked: [],
            show: false,
            allChecked: false,
            delete_album_id: '',
            action_flag: true,

            album_id: '',
            flag_input: false,
            get_album: '',

            current_page: 1,
            language: 'en',

            page_neighbours: 3,
            pagination: 10,
            page_num: '',

            pageArray: [1, 2, 3, 4],
            total_page: 100,
        };

        this.onCheckBox = this.onCheckBox.bind(this);
        this.onAllCheck = this.onAllCheck.bind(this);
    }

    componentDidMount() {
        this.onInitial();
        this.getDataFromSite();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.get_album_list && this.props.get_album_list !== prevProps.get_album_list) {
            this.setState({
                album_list: this.props.get_album_list,
            });
        }

        if(this.props.msg_album_list_error && this.props.msg_album_list_error !== prevProps.msg_album_list_error) {
            toast(this.props.msg_album_list_error);
            const {
                reset
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                reset();
                this.tmr = null;
            }, 2000);
        }
        if(this.state.current_page !== prevState.current_page || this.state.language !== prevState.language || this.state.pagination !== prevState.pagination) {
            if(!this.state.flag_input) {
                this.getDataFromSite();
            }
        }
        if(this.props.msg_create_album && this.props.msg_create_album !== prevProps.msg_create_album) {
            toast(this.props.msg_create_album);
            const {
                reset,
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                reset();
                this.tmr = null;
            }, 2000);
            if(!this.state.flag_input) {
                this.getDataFromSite();
            } else {
                this.getByAlbumId();
            }
        }

        // Check all
        if(this.state.allChecked !== prevState.allChecked) {
            const temp = [];
            if(this.state.allChecked === true) {
                if(this.state.flag_input === false) {
                    let list =  this.state.album_list;
                    Object.keys(list).map((item, key) => {
                        if(!this.state.action_flag && list[key].state === 1) {
                            temp.push(list[key].id.toString());
                        } else if(this.state.action_flag && list[key].state !== 1) {
                            temp.push(list[key].id.toString());
                        }
                        return null;
                    });
                } else {
                    let list = this.state.get_album && this.state.get_album.tracks;
                    Object.keys(list).map((item, key) => {
                        if(!this.state.action_flag && list[key].state === 1) {
                            temp.push(list[key].url.toString());
                        } else if(this.state.action_flag && list[key].state !== 1) {
                            temp.push(list[key].url.toString());
                        }
                        return null;
                    });
                }

                this.setState({
                    new_checked: temp,
                })
            }
        }
        if(this.state.new_checked !== prevState.new_checked) {
            let temp = [];
            if(this.state.flag_input === false) {
                let list =  this.state.album_list;
                Object.keys(list).map((item, key) => {
                    if(!this.state.action_flag && list[key].state === 1) {
                        temp.push(list[key].id.toString());
                    } else if(this.state.action_flag && list[key].state !== 1) {
                        temp.push(list[key].id.toString());
                    }
                    return null;
                });
            } else {
                let list = this.state.get_album && this.state.get_album.tracks;
                Object.keys(list).map((item, key) => {
                    if(!this.state.action_flag && list[key].state === 1) {
                        temp.push(list[key].url.toString());
                    } else if(this.state.action_flag && list[key].state !== 1) {
                        temp.push(list[key].url.toString());
                    }
                    return null;
                });
            }
            if(this.state.new_checked.length > 0 && this.state.new_checked.length === temp.length) {
                this.setState({
                    allChecked: true,
                })
            } else {
                this.setState({
                    allChecked: false,
                })
            }
        }

        /**
         * Getting data from one album id
         */
        if(this.props.msg_album_byId && this.props.msg_album_byId !== prevProps.msg_album_byId) {
            toast(this.props.msg_album_byId);
            const {
                reset
            } = this.props;
            clearTimeout(this.tmr);
            this.tmr = setTimeout(function () {
                reset();
                this.tmr = null;
            }, 2000);
        }

        if(this.props.get_album_byId && this.props.get_album_byId !== prevProps.get_album_byId) {
            this.setState({
                get_album: this.props.get_album_byId,
            });
        }
        if(this.state.language !== prevState.language && this.state.flag_input) {
            this.getByAlbumId();
        }
    }

    getDataFromSite = () => {
        let link = "https://jewishmusic.fm/jmusic/albums/get_all_albums?page=" + this.state.current_page+ "&count=" + this.state.pagination + "&lang=" + this.state.language;
        const {
            getAlbumListFromSite,
        } = this.props;
        if(getAlbumListFromSite) {
            const data = {
                role_id: localStorage.id,
                link: link,
            };
            getAlbumListFromSite(data);
        }
    };
    onCount = (e) => {
        this.setState({
            pagination: e.target.value,
        })
    };

    onLanguage = (e) => {
        this.setState({
            language: e.target.value,
        });
    };
    onPageClick = (item) => {
        this.setState({
            current_page: item,
            action_flag: true,
            new_checked: [],
            allChecked: false,
        });
        this.onCalcPageArray(item);
    };
    onCalcPageArray = (item) => {
        const current_page = item;
        const page_neighbours = this.state.page_neighbours;

        const total_page = this.state.total_page;
        //const total_page = Math.ceil(total_list_count / pagination);

        const start_page = Math.max(1, current_page - page_neighbours);
        const end_page = Math.min(total_page, current_page + page_neighbours);
        let pageArray = [];
        for (let k = start_page; k <= end_page; k ++) {
            pageArray.push(k);
        }
        this.setState({
            pageArray: pageArray,
        })
    };

    onInitial = () => {
        this.setState({
            album_list: [],
            new_checked: [],
            show: false,
            allChecked: false,
            delete_album_id: '',
            action_flag: true,

            album_id: '',
            flag_input: false,
            get_album: '',

            current_page: 1,
            language: 'en',

            page_neighbours: 3,
            pagination: 10,
            page_num: '',

            pageArray: [1, 2, 3, 4],
            total_page: 100,
        })
    };

    onAddAlbum = () => {
        if(this.state.flag_input === false) {
            const {
                addAlbumFromSite
            } = this.props;
            if(addAlbumFromSite) {
                const data = {
                    role_id: localStorage.id,
                    id: this.state.new_checked,
                    lang: this.state.language,
                };
                addAlbumFromSite(data);
            }
        } else {
            const {
                addTrackFromSite
            } = this.props;
            if(addTrackFromSite) {
                let tracks = this.state.get_album.tracks;
                let new_checked = this.state.new_checked;
                let send_tracks = [];
                for (let k = 0; k < new_checked.length; k ++) {
                    for (let i = 0; i < tracks.length; i ++) {
                        if (new_checked[k] === tracks[i].url) {
                            send_tracks.push({
                                download: tracks[i].download,
                                title: tracks[i].title,
                                url: tracks[i].url,
                            });
                        }
                    }
                }

                const data = {
                    role_id: localStorage.id,
                    album: this.state.get_album,
                    tracks_url: this.state.new_checked,
                    tracks: send_tracks,//this.state.new_checked,
                    lang: this.state.language,
                };
                addTrackFromSite(data);
            }
        }

        this.setState({
            new_checked: [],
            allChecked: false,
        })
    };
    onShowDeleteModal = () => {
        this.setState({
            show: true,
            delete_album_id: this.state.new_checked,
        })
    };
    hideDeleteModal = () => {
        this.setState({
            show: false,
            new_checked: [],
            allChecked: false,
        });
    };

    /**
     * For registration of albums or tracks
     */
    onCheckBox = (e) => {
        const {
            new_checked
        } = this.state;
        const temp = JSON.parse(JSON.stringify(new_checked));
        if(e.target.checked === true){
            temp.push(e.target.id);
        } else{
            temp.splice(temp.indexOf(e.target.id), 1);
        }

        console.log("temp = ", temp);

        this.setState({new_checked: temp});
    };
    onActionClick = () => {
        this.setState({
            action_flag: !this.state.action_flag,
            new_checked: [],
            allChecked: false,
        })
    };
    onAllCheck = () => {
        this.setState({
            allChecked: !this.state.allChecked,
            new_checked: [],
        });
    };


    onAlbumId = (e) => {
        console.log("###### ", e.target.value);
        this.setState({
            [e.target.id]: e.target.value || '',
        })
    };
    onInputAlbumId = (code) => {
        if (code === 13) {
            if(this.state.album_id !== "") {
                this.setState({
                    flag_input: true,
                });
                this.getByAlbumId();
            } else {
                this.setState({
                    flag_input: false,
                    get_album: '',
                });
            }
            this.setState({
                new_checked: [],
                allChecked: false,
            });

           console.log("Success =  =======")
        }
    };
    /**
     * calling by album_id
     */
    getByAlbumId = () => {
        const {
            getAlbumByIdFromSite,
        } = this.props;
        if(getAlbumByIdFromSite) {
            const data = {
                role_id: localStorage.id,
                id: this.state.album_id,
                lang: this.state.language,
            };
            getAlbumByIdFromSite(data);
        }
    };
    onBack = () => {
        this.setState({
            flag_input: false,
        })
    };
    render() {
        const {
            album_list,
        } = this.state;

        const paginationArray = [10, 15, 25, 50];
        return (
            <>
                <div className="spinning-curtain" style={{display: this.props.spinning ? "flex" : "none"}}>
                    <div className="lds-dual-ring"/>
                </div>
                <ToastContainer />
                <div className="col-darkBlue txt-30 txt-bold pb-20 pl-40">
                    {
                        this.state.flag_input?
                            "Track List"
                            :
                            "Album List"
                    }
                </div>
                <div className="form-bg">
                    <div className="flex-space album-list">
                        <div className="justify-left add-album">
                            {
                                !this.state.flag_input && (
                                    <>
                                        <div className="justify-center col-buttonAndLink">Counts</div>
                                        <div>
                                            <select
                                                className="count mouse-cursor"
                                                onChange={this.onCount}
                                            >
                                                {
                                                    paginationArray.map((item, key) => {
                                                        return (
                                                            <option key={key} value={item}>{item}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </>
                                )
                            }

                            <div className="justify-center col-buttonAndLink ml-40">Language</div>
                            <div>
                                <select
                                    className="count mouse-cursor"
                                    style={{marginLeft: 20, marginRight: 20}}
                                    value={this.state.language}
                                    onChange={(e) => this.onLanguage(e)}
                                >
                                    <option key="1" value="en">English</option>
                                    <option key="2" value="he">Hebrew</option>
                                </select>
                            </div>

                            <div className="justify-center col-buttonAndLink ml-40" style={{marginRight: 10}}>Album ID</div>
                            <div className="mr-id-10">
                                <input
                                    id="album_id"
                                    className="count mouse-cursor"
                                    placeholder="Album Id for registration."
                                    value={this.state.album_id}
                                    onChange={(e) => this.onAlbumId(e)}
                                    onKeyUp={e => this.onInputAlbumId(e.keyCode)}
                                />
                            </div>
                        </div>
                        {
                            this.state.flag_input && (
                                <div
                                    className="btn-common action mouse-cursor col-white mr-id-10"
                                    onClick={this.onBack}
                                >
                                    Back
                                </div>
                            )
                        }
                        {
                            this.state.action_flag?
                                <div
                                    className="btn-common action mouse-cursor col-white"
                                    onClick={this.onAddAlbum}
                                >
                                    Register
                                </div>
                                :
                                <div
                                    className="btn-common action mouse-cursor col-white"
                                    onClick={this.onShowDeleteModal}
                                >
                                    Unregister
                                </div>
                        }
                    </div>
                    {
                        !this.state.flag_input?
                            <>
                                <div className="table-p">
                                    <table className="tList">
                                        <thead>
                                        <tr className="table-list">
                                            <th>No</th>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Date</th>
                                            <th>Image</th>
                                            <th>State</th>

                                            <th
                                                className="mouse-cursor"
                                            >
                                                {
                                                    this.state.action_flag ?
                                                        <div className="justify-left" style={{paddingTop: 13}}>
                                                            <label className="container-event justify-left">
                                                                <div
                                                                    className="col-paragraphBg"
                                                                    onClick={this.onActionClick}
                                                                >
                                                                    Register
                                                                </div>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={this.state.allChecked}
                                                                    onChange={this.onAllCheck}
                                                                />
                                                                <span className="checkMark"/>
                                                            </label>
                                                        </div>
                                                        :
                                                        <div className="justify-left" style={{paddingTop: 13}}>
                                                            <label className="container-event justify-left">
                                                                <div
                                                                    className="col-paragraphBg"
                                                                    onClick={this.onActionClick}
                                                                >
                                                                    Unregister
                                                                </div>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={this.state.allChecked}
                                                                    onChange={this.onAllCheck}
                                                                />
                                                                <span className="checkMark"/>
                                                            </label>
                                                        </div>
                                                }
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.album_list && Object.keys(this.state.album_list).map((item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td style={{paddingLeft: 20}}>
                                                            {key + 1}
                                                        </td>
                                                        <td>
                                                            {album_list[key].id}
                                                        </td>
                                                        <td>
                                                            {album_list[key].title}
                                                        </td>
                                                        <td>
                                                            {
                                                                new Date(album_list[key].date).toLocaleString([], {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: '2-digit',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                })
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                album_list[key].thumbnail && (
                                                                    <img className="thumbnail-size" src={album_list[key].thumbnail} alt="" />
                                                                )
                                                            }
                                                        </td>
                                                        <td className="flex-common">
                                                            {
                                                                album_list[key].state === 1?
                                                                    <div
                                                                        className="icon-flex tooltip"
                                                                    >
                                                                        <img
                                                                            className="icon-size"
                                                                            src={require("../assets/images/bin-28.svg")}
                                                                            alt="View"
                                                                        />
                                                                        <span className="tooltiptext">The registered Album</span>
                                                                    </div>
                                                                    :
                                                                    <div
                                                                        className="icon-flex tooltip"
                                                                    >
                                                                        <img
                                                                            className="icon-size"
                                                                            src={require("../assets/images/add.svg")}
                                                                            alt="Edit" />
                                                                        <span className="tooltiptext">Add the Album</span>
                                                                    </div>
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                !this.state.action_flag && album_list[key].state === 1 && (
                                                                    <label className="container-event" key={key}>
                                                                        <input
                                                                            id={album_list[key].id}
                                                                            type="checkbox"
                                                                            checked={this.state.new_checked.includes(album_list[key].id.toString())}
                                                                            onChange={(e) => this.onCheckBox(e)}
                                                                        />
                                                                        <span className="checkMark"/>
                                                                    </label>
                                                                )
                                                            }
                                                            {
                                                                this.state.action_flag && album_list[key].state !== 1 && (
                                                                    <label className="container-event" key={key}>
                                                                        <input
                                                                            id={album_list[key].id}
                                                                            type="checkbox"
                                                                            checked={this.state.new_checked.includes(album_list[key].id.toString())}
                                                                            onChange={(e) => this.onCheckBox(e)}
                                                                        />
                                                                        <span className="checkMark"/>
                                                                    </label>
                                                                )
                                                            }
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
                                        this.state.pageArray && this.state.pageArray.map((item, key) => {
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

                                    <div className="product-btn justify-center" onClick={() => this.onPageClick(this.state.total_page)}>
                                        <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.39506 14.6383C1.57978 14.6383 1.76643 14.5779 1.92229 14.457L10.077 8.02084C10.2752 7.86414 10.3906 7.62814 10.3906 7.37704C10.3906 7.12782 10.2752 6.88993 10.077 6.73512L1.95692 0.332906C1.59518 0.047818 1.06603 0.104458 0.775474 0.459402C0.484922 0.814346 0.542647 1.33355 0.904394 1.61863L8.2086 7.37704L0.867834 13.1713C0.506087 13.4564 0.448362 13.9756 0.738914 14.3305C0.906319 14.5326 1.14877 14.6383 1.39506 14.6383Z" fill="black" fillOpacity="0.65"/>
                                        </svg>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                {
                                    this.state.get_album && (
                                        <>
                                            <div className="flex-grid2 album-grid">
                                                <div className="album-grid-mt">
                                                    <img
                                                        className="album-img mouse-cursor"
                                                        src={this.state.get_album.thumbnail_images.full.url}
                                                        onClick={() => window.location = this.state.get_album.buttons}
                                                        alt="" />
                                                </div>

                                                <div className="album-grid-mt justify-center col-darkBlue">
                                                    <div>
                                                        <div className="justify-center">
                                                            <img
                                                                className="album-thumbnail-img mouse-cursor"
                                                                src={this.state.get_album.thumbnail}
                                                                onClick={() => window.location = this.state.get_album.buttons}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="pt-10 justify-center txt-bold txt-20">
                                                            Title:
                                                        </div>
                                                        <div className="justify-center">
                                                            {this.state.get_album.title}
                                                        </div>
                                                        <div className="pt-10 justify-center txt-bold txt-20">
                                                            Articles:
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
                                                                this.state.get_album.taxonomy_artists.map((item, key) => {
                                                                    return (
                                                                        <tr key={key} className="table-list album">
                                                                            <td>{key + 1}</td>
                                                                            <td>{item.id}</td>
                                                                            <td>{item.title}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="pt-30 pb-10 justify-center col-paragraphBg txt-20">Tracks</div>
                                            </div>
                                            <div className="table-p">
                                                <table className="tList">
                                                    <thead>
                                                    <tr className="table-list album">
                                                        <th>No</th>
                                                        <th>Title</th>
                                                        <th>Url</th>
                                                        <th>Download</th>
                                                        <th>
                                                            {
                                                                this.state.action_flag ?
                                                                    <div className="justify-left" style={{paddingTop: 13}}>
                                                                        <label className="container-event justify-left">
                                                                            <div
                                                                                className="col-paragraphBg"
                                                                                onClick={this.onActionClick}
                                                                            >
                                                                                Register
                                                                            </div>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={this.state.allChecked}
                                                                                onChange={this.onAllCheck}
                                                                            />
                                                                            <span className="checkMark"/>
                                                                        </label>
                                                                    </div>
                                                                    :
                                                                    <div className="justify-left" style={{paddingTop: 13}}>
                                                                        <label className="container-event justify-left">
                                                                            <div
                                                                                className="col-paragraphBg"
                                                                                onClick={this.onActionClick}
                                                                            >
                                                                                Unregister
                                                                            </div>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={this.state.allChecked}
                                                                                onChange={this.onAllCheck}
                                                                            />
                                                                            <span className="checkMark"/>
                                                                        </label>
                                                                    </div>
                                                            }
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        this.state.get_album.tracks.map((item, key) => {
                                                            return (
                                                                <tr key={key} className="table-list album">
                                                                    <td>{key + 1}</td>
                                                                    <td>{item.title}</td>
                                                                    <td>{item.url}</td>
                                                                    <td>{item.download === ""? 0: item.download}</td>
                                                                    <td>
                                                                        {
                                                                            !this.state.action_flag && item.state === 1 && (
                                                                                <label className="container-event" key={key}>
                                                                                    <input
                                                                                        id={item.url}
                                                                                        type="checkbox"
                                                                                        checked={this.state.new_checked.includes(item.url.toString())}
                                                                                        onChange={(e) => this.onCheckBox(e)}
                                                                                    />
                                                                                    <span className="checkMark"/>
                                                                                </label>
                                                                            )
                                                                        }
                                                                        {
                                                                            this.state.action_flag && item.state !== 1 && (
                                                                                <label className="container-event" key={key}>
                                                                                    <input
                                                                                        id={item.url}
                                                                                        type="checkbox"
                                                                                        checked={this.state.new_checked.includes(item.url.toString())}
                                                                                        onChange={(e) => this.onCheckBox(e)}
                                                                                    />
                                                                                    <span className="checkMark"/>
                                                                                </label>
                                                                            )
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    )
                                }

                            </>

                    }


                </div>

            {/*  Modal  */}
                {
                    !this.state.flag_input ?
                        <DeleteAlbum
                            show={this.state.show}
                            handleClose={this.hideDeleteModal}
                            lang={this.state.language}
                            albums={this.state.delete_album_id}
                            flag={this.state.flag_input}
                        />
                        :
                        <DeleteAlbum
                            show={this.state.show}
                            handleClose={this.hideDeleteModal}
                            lang={this.state.language}
                            albums={this.state.delete_album_id}
                            flag={this.state.flag_input}
                            id={this.state.album_id}
                        />
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        spinning: state.users.spinning,
        get_album_list: state.users.get_album_list,
        msg_album_list_error: state.users.msg_album_list_error,
        msg_create_album: state.users.msg_create_album,

        get_album_byId: state.users.get_album_byId,
        msg_album_byId: state.users.msg_album_byId,
    }
};

export default connect(
    mapStateToProps,
    {
        reset,
        getAlbumListFromSite,
        addAlbumFromSite,
        getAlbumByIdFromSite,

        addTrackFromSite,
    }
)(AddAlbum);