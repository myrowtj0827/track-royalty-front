/**
 * The file for creating, editing, deleting, and viewing for the users
 */
import axios from "axios";
import config from "../../../config/index"
import {
    SHOW_SPINNING,
    CREATE_PUBLISHER,
    ERROR_CREATE_PUBLISHER,
    GET_USERS,
    GET_USER_ERROR,
    DELETE_USER,
    GET_USER,
    ERROR_USER,
    GET_ALL_USERS,
} from "../types/types";

export const reset = () => dispatch => {
    dispatch({
        type: CREATE_PUBLISHER,
        payload: '',
    });
    dispatch({
        type: ERROR_CREATE_PUBLISHER,
        payload: '',
    });
    dispatch({
        type: GET_USER_ERROR,
        payload: '',
    });
    dispatch({
        type: DELETE_USER,
        payload: '',
    });
    dispatch({
        type: ERROR_USER,
        payload: '',
    });
};

export const createPublisher = (data) => dispatch => {
    console.log(data);
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/users/create-publisher", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: CREATE_PUBLISHER,
                payload: res.data.msg,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: ERROR_CREATE_PUBLISHER,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};
export const getUserList = (data) => dispatch => {
    console.log(data);
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/users/get-users", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: GET_USERS,
                payload: res.data.results,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: GET_USER_ERROR,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};
export const deleteUser = (data) => dispatch => {
    console.log("delete Data = ", data);
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/users/delete-user", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: DELETE_USER,
                payload: res.data.msg,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: DELETE_USER,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};
export const getPublisherById = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/users/get-user", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: GET_USER,
                payload: res.data.results,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: ERROR_USER,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};
export const getAllUsers = (data) => dispatch => {
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/users/get-all-users", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: GET_ALL_USERS,
                payload: res.data.results,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: GET_USER_ERROR,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};
/**
 * Update the publisher profile oneself
 */
export const updatePublisher = (data) => dispatch => {
    console.log(data);
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/users/update-publisher", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: CREATE_PUBLISHER,
                payload: res.data.msg,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: ERROR_CREATE_PUBLISHER,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};