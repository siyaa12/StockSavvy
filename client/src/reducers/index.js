

import { 
  LOGIN_REQUEST, LOGIN_SUCCEED, LOGIN_FAIL, 
  REGISTER_FAIL, REGISTER_SUCCEED, REGISTER_REQUEST, 
  TOKEN_RECEIVE, TOKEN_VERIFY, TOKEN_REJECT,
  LOGOUT_REQUEST, LOGOUT_SUCCEED
} from '../constants'
import { combineReducers } from 'redux';

const initialState = {
  type: '',
  status: '',
}

const initUser = {
  isPageLoading: true,
  isLoggedIn: false,
  email: '',
  name: '',
}

const message = (state = initialState, {type, payload} ) => {
  switch(type){
    case LOGIN_REQUEST:
      return {
        ...state,
        type: "login",
        status: 'Logging in'
      }
    case LOGIN_FAIL:
      return {
        ...state,
        type: "login error",
        status: 'Failed to Log in, ' + payload
      }
    case LOGIN_SUCCEED:
      window.localStorage.setItem('token', payload.token)
      return {
        ...state,
        type: "login success",
        status: payload.success
      }
    case REGISTER_REQUEST:
      return {
        ...state,
        type: "register",
        status: "Registering"
      }
    case REGISTER_FAIL:
      return {
        ...state,
        type: "register error",
        status: "Failed to register, " + payload
      }
    case REGISTER_SUCCEED:
      window.localStorage.setItem('token', payload.token)
      return {
        ...state,
        type: 'register success',
        status: payload.success
      }
    default:
      return state
  }
}

const user = (state = initUser, {type, payload} ) => {
  switch(type){
    case TOKEN_RECEIVE:
      return initUser
    case TOKEN_VERIFY:
      return {
        ...state,
        isLoggedIn: true,
        isPageLoading: false,
        email: payload.email,
        name: payload.name
      }
    case TOKEN_REJECT:
      return {
        ...initUser,
        isPageLoading: false
      }
    case LOGOUT_REQUEST:
      return state
    case LOGOUT_SUCCEED:
      window.localStorage.setItem('token', '')
      return initUser
    default:
      return state
  }
}

export default combineReducers({
  user,
  message
})