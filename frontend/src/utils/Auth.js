import { apiOptions } from "./utils";

export class Auth {
    constructor(apiOptions) {
        this._url = apiOptions.baseUrl;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`)
    }

    registerUser(email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(res => this._checkResponse(res));
    }

    authUser(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(res => this._checkResponse(res));
    }

    checkToken() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(res => this._checkResponse(res))
    }
}

export const auth = new Auth(apiOptions);