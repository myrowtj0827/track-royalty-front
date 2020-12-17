/**
 * The file for album creating/assigning, track editing/assigning
 */

import axios from "axios";
import config from "../../../config/index";

import {
    SHOW_SPINNING,
    GET_EXISTING_ALBUM,
    ERROR_ALBUM_LIST,
    DELETE_ALBUM,
    ADD_ALBUM,

    GET_REGISTERED_ALBUMS,
    ERROR_REGISTERED_ALBUM_LIST,

    ASSIGN_ALBUMS,
    ERROR_ASSIGN_ALBUMS,

    GET_ALBUM_BYID,
    ERROR_ALBUM_BYID,
} from "../types/types";

export const reset = () => dispatch => {
    dispatch({
        type: ERROR_ALBUM_LIST,
        payload: '',
    });
    dispatch({
        type: ADD_ALBUM,
        payload: '',
    });
    dispatch({
        type: DELETE_ALBUM,
        payload: '',
    });
    dispatch({
        type: ERROR_ALBUM_BYID,
        payload: '',
    });
};

export const resetList = () => dispatch => {
    dispatch({
        type: ERROR_REGISTERED_ALBUM_LIST,
        payload: '',
    });
    dispatch({
        type: ASSIGN_ALBUMS,
        payload: '',
    });
    dispatch({
        type: ERROR_ASSIGN_ALBUMS,
        payload: '',
    });
};

export const getAlbumListFromSite = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/albums/get-albums-jewishmusic", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: GET_EXISTING_ALBUM,
                payload: res.data.results,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: ERROR_ALBUM_LIST,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};

/**
 * Getting data from one album_id
 */
export const getAlbumByIdFromSite = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/albums/get-byid-jewishmusic", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: GET_ALBUM_BYID,
                payload: res.data.results,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: ERROR_ALBUM_BYID,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};

export const addAlbumFromSite = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/albums/add-album", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: ADD_ALBUM,
                payload: res.data.msg,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: ADD_ALBUM,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};

export const addTrackFromSite = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/albums/add-track", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: ADD_ALBUM,
                payload: res.data.msg,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: ADD_ALBUM,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};

export const deleteAlbum = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/albums/delete-album", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: DELETE_ALBUM,
                payload: res.data.msg,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: DELETE_ALBUM,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};
export const deleteTrack = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/albums/delete-track", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: DELETE_ALBUM,
                payload: res.data.msg,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: DELETE_ALBUM,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};
/**
 * Getting the registered album list
 */
export const getRegisteredAlbumList = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/albums/get-registered-albums", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: GET_REGISTERED_ALBUMS,
                payload: res.data.results,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: ERROR_REGISTERED_ALBUM_LIST,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};
/**
 * Assigning albums
 */
export const assignAlbumsToUser = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/albums/assign-albums", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: ASSIGN_ALBUMS,
                payload: res.data.msg,
            });
        }).catch(err => {
        dispatch({type: SHOW_SPINNING, payload: false});
        dispatch({
            type: ERROR_ASSIGN_ALBUMS,
            payload: err.response ? err.response.data.msg : {error: "error"},
        });
    })
};
/**
 * Getting the assigned album list to the publisher
 */
export const getAssignedAlbumsById = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/albums/get-assigned-albums", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: GET_REGISTERED_ALBUMS,
                payload: res.data.results,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: ERROR_REGISTERED_ALBUM_LIST,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};
/**
 * Assigning albums
 */
export const unassignAlbumsToUser = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/albums/unassign-albums-user", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: ASSIGN_ALBUMS,
                payload: res.data.msg,
            });
        }).catch(err => {
        dispatch({type: SHOW_SPINNING, payload: false});
        dispatch({
            type: ERROR_ASSIGN_ALBUMS,
            payload: err.response ? err.response.data.msg : {error: "error"},
        });
    })
};