class Auth {
    constructor() {
        this._baseURL = 'https://auth.nomoreparties.co';
        this._headers = { 'Content-Type': 'application/json' };
    }

    authorization({ password, email }) {
        return this._request('signin', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        });
    }

    registration({ password, email }) {
        return this._request('signup', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        });
    }

    validation(token) {
        return this._request('users/me', {
            headers: { ...this.headers, Authorization: `Bearer ${token}` },
        });
    }

    _getResult(result) {
        return result.ok ? result.json() : Promise.reject(new Error(`Ошибка ${result.status}`));
    }

    _request(path, options) {
        return fetch(`${this._baseURL}/${path}`, options).then(this._getResult);
    }
}

const auth = new Auth();
export default auth;
