import fetch from 'isomorphic-fetch';

import SETTINGS from '../settings';

export const POST_LOGIN_START = 'POST_LOGIN_START';
export const POST_LOGIN_DONE  = 'POST_LOGIN_DONE';

export const POST_LOGOUT_START = 'POST_LOGOUT_START';
export const POST_LOGOUT_DONE  = 'POST_LOGOUT_DONE';


export function postLoginStart() {
  return {
    type: POST_LOGIN_START
  }
}

export function postLoginDone(response) {
  return {
    type: POST_LOGIN_DONE,
    response
  }
}

export function accountLogin(userCredentials) {
  return dispatch => {
    dispatch(postLoginStart());

    return fetch(SETTINGS.API_BASE + '/account/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
    })
      .then(response => response.json())
      .then(json => dispatch(postLoginDone(json)));
  }
}

export function postLogoutStart() {
  return {
    type: POST_LOGOUT_START
  }
}

export function postLogoutDone(response) {
  return {
    type: POST_LOGOUT_DONE,
    response
  }
}

export function accountLogout() {
  return dispatch => {
    dispatch(postLogoutStart());

    return fetch(SETTINGS.API_BASE + '/account/logout/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + window.localStorage.auth_token
      },
      body: JSON.stringify({})
    })
      .then(response => {
        if (response.status === 200) return {};
      })
      .then(json => dispatch(postLogoutDone(json)));
  } 
}
