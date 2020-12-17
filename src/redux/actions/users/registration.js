/**
 * The file for registration, login, logout, and forgot password of users and admin
 */
import axios from "axios";
import config from "../../../config/index"

import {
    USER_ERROR,
    USER_REGISTRATION,
    SHOW_SPINNING,
} from "../types/types";

export const reset = () => dispatch => {
    dispatch({
        type: USER_REGISTRATION,
        payload: '',
    });
    dispatch({
        type: USER_ERROR,
        payload: '',
    });
};

export const registerUser = (data) => dispatch => {
    console.log(data);
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/users/register-user", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: USER_REGISTRATION,
                payload: res.data.msg,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: USER_ERROR,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};

export const login = (data) => dispatch => {
    console.log(data);
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/users/login", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: USER_REGISTRATION,
                payload: res.data.msg,
            });
            let temp = res.data.results;
            localStorage.setItem("id", temp._id);
            localStorage.setItem("name", temp.name);
            localStorage.setItem("email", temp.email);
            localStorage.setItem("role", temp.role);
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: USER_ERROR,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};

export const logOut = () => dispatch => {
    dispatch({
        type: USER_REGISTRATION,
        payload: 'The logout has succeed.',
    });
    window.location.href = '/login';

    localStorage.setItem("id", '');
    localStorage.setItem("name", '');
    localStorage.setItem("email", '');
    localStorage.setItem("role", '');
};

export const forgotPassword = (data) => dispatch => {
    console.log(data);
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/users/forgot-password", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: USER_REGISTRATION,
                payload: res.data.results,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: USER_ERROR,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};

export const resetPassword = (data) => dispatch => {
    console.log(data);
    dispatch({type: SHOW_SPINNING, payload: true});
    axios
        .post(config.SIM_API_URL + "/api/users/reset-password", data)
        .then(res => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: USER_REGISTRATION,
                payload: res.data.msg,
            });
        })
        .catch(err => {
            dispatch({type: SHOW_SPINNING, payload: false});
            dispatch({
                type: USER_ERROR,
                payload: err.response ? err.response.data.msg : {error: "error"},
            });
        })
};