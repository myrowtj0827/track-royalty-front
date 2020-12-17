/**
 * The file for track management
 */

import axios from "axios";
import config from "../../../config/index";

import {
    SHOW_SPINNING,
    GET_TRACK_LIST,
    ERROR_TRACK_LIST,
    TRACK_UPDATE_PAYMENT,
    UPDATE_PAID,
} from "../types/types";

export const reset = () => dispatch => {
    dispatch({
        type: ERROR_TRACK_LIST,
        payload: '',
    });
    dispatch({
        type: TRACK_UPDATE_PAYMENT,
        payload: '',
    });
};

export const resetManagement = () => dispatch => {
    dispatch({
        type: UPDATE_PAID,
        payload: '',
    })
};
/**
 * Getting the track list by publisher_id and album_id
 */
export const getTrackListById = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/managements/get-tracks", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: GET_TRACK_LIST,
                payload: res.data.results,
            });
        }).catch(err => {
        dispatch({type: SHOW_SPINNING, payload: false});
        dispatch({
            type: ERROR_TRACK_LIST,
            payload: err.response ? err.response.data.msg : {error: "error"},
        });
    })
};

/**
 * Updating the payment per track
 */
export const updateTrackPayment = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/managements/update-track", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: TRACK_UPDATE_PAYMENT,
                payload: res.data.msg,
            });
        }).catch(err => {
        dispatch({type: SHOW_SPINNING, payload: false});
        dispatch({
            type: TRACK_UPDATE_PAYMENT,
            payload: err.response ? err.response.data.msg : {error: "error"},
        });
    })
};
/**
 * Updating the paid amount
 */
export const updatePaid = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/managements/update-paid", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: UPDATE_PAID,
                payload: res.data.msg,
            });
        }).catch(err => {
        dispatch({type: SHOW_SPINNING, payload: false});
        dispatch({
            type: UPDATE_PAID,
            payload: err.response ? err.response.data.msg : {error: "error"},
        });
    })
};
/**
 * Extra to get the call from the existing site
 */
export const addPaymentInfo = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/managements/add-played-track", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: TRACK_UPDATE_PAYMENT,
                payload: res.data.msg,
            });
        }).catch(err => {
        dispatch({type: SHOW_SPINNING, payload: false});
        dispatch({
            type: TRACK_UPDATE_PAYMENT,
            payload: err.response ? err.response.data.msg : {error: "error"},
        });
    })
};