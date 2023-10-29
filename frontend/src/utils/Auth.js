import { authOptions } from "./utils";

export class Auth {
    constructor(authOptions) {
        this._url = authOptions.baseUrl;
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
                'Accept': "application/json",
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
                'Accept': "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(res => this._checkResponse(res));
    }

    checkToken(userToken) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${userToken}`
            }
        })
        .then(res => this._checkResponse(res))
    }
}

export const auth = new Auth(authOptions);