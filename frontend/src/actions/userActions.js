import axios from "axios";
import Cookie from "js-cookie";
import { USER_INFO_CHANGE_FAIL, USER_INFO_CHANGE_REQUEST, USER_INFO_CHANGE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email,password}});
    try{
        const { data } = await axios.post("/api/users/signin", {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        Cookie.set('userInfo', JSON.stringify(data))
    }
    catch(error){
        dispatch({type: USER_SIGNIN_FAIL, payload: error.message})
    }
}

const register = (name, email, password) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, email,password}});
    try{
        const { data } = await axios.post("/api/users/register", {name, email, password});
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        Cookie.set('userInfo', JSON.stringify(data))
    }
    catch(error){
        dispatch({type: USER_REGISTER_FAIL, payload: error.message})
    }
}

const saveProfile = ({ userId, name, email }) => async (dispatch, getState) => {
    dispatch({type: USER_INFO_CHANGE_REQUEST, payload: { userId, name, email }});
    const { userSignin: {userInfo} } = getState();
    try{
        const { data } = await axios.put('/api/users/' + userId, { name, email }, {
            headers: {
            'Authorization': 'Bearer' + userInfo.token
        }

        });
        dispatch({ type: USER_INFO_CHANGE_SUCCESS, payload: data })
        Cookie.set('userInfo', JSON.stringify(data));
    }
    catch(error){
        dispatch({ type: USER_INFO_CHANGE_FAIL, payload: error.message })
    }
}

export { signin, register, saveProfile };