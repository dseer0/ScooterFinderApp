import makeAlert from './Alert';
import jwt from 'jwt-decode';
export const login = (onSuccess, onFailure) => {};
export const register = (mail, password, onSuccess, onFailure) => {
  return fetch('https://serverimage-itxfgp626q-lz.a.run.app/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: mail,
      displayName: mail,
      password: password,
    }),
  }).then(r => {
    const res = r.status;
    if (res === 200) {
      onSuccess();
    } else {
      r.json().then(data => onFailure(data));
    }
  });
};

export const addpin = (coordinates, token) => {
  return fetch('https://serverimage-itxfgp626q-lz.a.run.app/pin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      pinTypeId: 1,
      userId: 1,
      description: '',
      pinName: '',
      coordinates: coordinates,
    }),
  });
};

export const getpins = token => {
  return fetch('https://serverimage-itxfgp626q-lz.a.run.app/pins', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};

export const deletepin = (id, token) => {
  return fetch('https://serverimage-itxfgp626q-lz.a.run.app/pin?id=' + id, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};

export const getPinInfo = (id, token) => {
  return fetch(
    'https://serverimage-itxfgp626q-lz.a.run.app/pin-details?id=' + id,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  ).then(r => r.json());
};

export const editPin = (id, description, token) => {
  return fetch('https://serverimage-itxfgp626q-lz.a.run.app/pin', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      pinId: id,
      description: description,
      pinName: '',
    }),
  });
};

export const addComment = (pinId, text, token) => {
  const decoded = jwt(token);
  const userid = decoded.id;
  console.log(userid);
  return fetch('https://serverimage-itxfgp626q-lz.a.run.app/comment', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      content: text,
      userId: userid,
      pinId: pinId,
    }),
  });
};
