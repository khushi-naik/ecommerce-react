import { USER_INFO_CHANGE_FAIL, USER_INFO_CHANGE_REQUEST, USER_INFO_CHANGE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstants";

function userSigninReducer(state={}, action){
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function userRegisterReducer(state={}, action){
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function profileSaveReducer(state={}, action){
    switch(action.type){
        case USER_INFO_CHANGE_REQUEST:
            return {loading: true};
        case USER_INFO_CHANGE_SUCCESS:
            return {loading: false, success: true, userInfo: action.payload};
        case USER_INFO_CHANGE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}
export { userSigninReducer, userRegisterReducer, profileSaveReducer };