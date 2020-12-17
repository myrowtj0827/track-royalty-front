import {
    SHOW_SPINNING,
    USER_ERROR,
    USER_REGISTRATION,
    CREATE_PUBLISHER,
    ERROR_CREATE_PUBLISHER,
    GET_USER_ERROR,
    GET_USERS,
    DELETE_USER,
    GET_USER,
    ERROR_USER,
    GET_ALL_USERS,

    GET_EXISTING_ALBUM,
    ERROR_ALBUM_LIST,
    ADD_ALBUM,
    DELETE_ALBUM,

    GET_REGISTERED_ALBUMS,
    ERROR_REGISTERED_ALBUM_LIST,

    ASSIGN_ALBUMS,
    ERROR_ASSIGN_ALBUMS,

    GET_ALBUM_BYID,
    ERROR_ALBUM_BYID,
    GET_TRACK_LIST,
    ERROR_TRACK_LIST,

    TRACK_UPDATE_PAYMENT,
    UPDATE_PAID,
} from "../actions/types/types"

const initialState = {
    spinning: '',
    msg_user_error: '',
    msg_registration: {},
    msg_create_publisher: '',
    msg_publisher_error: '',
    getUser_list: '',
    msg_get_users: '',
    msg_user_delete: '',
    get_user: '',
    msg_user: '',
    getAll_users: '',

    get_album_list: '',
    msg_album_list_error: '',
    msg_create_album: '',

    get_registered_albums: '',
    msg_registered_albums: '',

    msg_assign_albums: '',
    msg_error_assign_albums: '',

    get_album_byId: '',
    msg_album_byId: '',
    get_track_list: '',
    msg_error_tracks: '',

    msg_track_update: '',
    msg_paid: '',
};

export default function (state = initialState, action) {
    switch(action.type){
        case UPDATE_PAID:
            return {
                ...state,
                msg_paid: action.payload,
            };
        case TRACK_UPDATE_PAYMENT:
            return {
                ...state,
                msg_track_update: action.payload,
            };
        case GET_TRACK_LIST:
            return {
                ...state,
                get_track_list: action.payload,
            };
        case ERROR_TRACK_LIST:
            return {
                ...state,
                msg_error_tracks: action.payload,
            };
        case GET_ALBUM_BYID:
            return {
                ...state,
                get_album_byId: action.payload,
            };
        case ERROR_ALBUM_BYID:
            return {
                ...state,
                msg_album_byId: action.payload,
            };
        case ASSIGN_ALBUMS:
            return {
                ...state,
                msg_assign_albums: action.payload,
            };
        case ERROR_ASSIGN_ALBUMS:
            return {
                ...state,
                msg_error_assign_albums: action.payload,
            };
        case GET_ALL_USERS:
            return {
                ...state,
                getAll_users: action.payload,
            };
        case GET_REGISTERED_ALBUMS:
            return {
                ...state,
                get_registered_albums: action.payload,
            };
        case ERROR_REGISTERED_ALBUM_LIST:
            return {
                ...state,
                msg_registered_albums: action.payload,
            };
        case DELETE_ALBUM:
            return {
                ...state,
                msg_album_delete: action.payload,
            };
        case ADD_ALBUM:
            return {
                ...state,
                msg_create_album: action.payload,
            };
        case GET_EXISTING_ALBUM:
            return {
                ...state,
                get_album_list: action.payload,
            };
        case ERROR_ALBUM_LIST:
            return {
                ...state,
                msg_album_list_error: action.payload,
            };
        case GET_USER:
            return {
                ...state,
                get_user: action.payload,
            };
        case ERROR_USER:
            return {
                ...state,
                msg_user: action.payload,
            };
        case DELETE_USER:
            return {
                ...state,
                msg_user_delete: action.payload,
            };
        case GET_USERS:
            return {
                ...state,
                getUser_list: action.payload,
            };
        case GET_USER_ERROR:
            return {
                ...state,
                msg_get_users: action.payload,
            };
        case ERROR_CREATE_PUBLISHER:
            return {
                ...state,
                msg_publisher_error: action.payload,
            };
        case CREATE_PUBLISHER:
            return {
                ...state,
                msg_create_publisher: action.payload,
            };
        case SHOW_SPINNING:
            return {
                ...state,
                spinning: action.payload,
            };
        case USER_REGISTRATION:
            return {
                ...state,
                msg_registration: action.payload,
            };

        case USER_ERROR:
            return {
                ...state,
                msg_user_error: action.payload
            };

        default:
            return state;
    }
}
