class Auth {
    constructor() {
        this._baseURL = 'http://api.cardsplace.nomoreparties.co';
        this._headers = { 
            "Accept":'application/json',
            'Content-Type': 'application/json' };
    }


    authorization({ password, email }) {
        return this._request('sign-in', {
            method: 'POST',
            headers: this._headers,
            credentials:'include',
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        });
    }

    registration({ password, email }) {
        return this._request('sign-up', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        });
    }

    validation() {
        return this._request('users/me', {
            headers: { ...this.headers },
            credentials:'include',
        });
    }
 
    logout() {
        return this._request('logout',{
            headers: { ...this.headers },
            credentials:'include',
        })
    }
  
    _getResult(result) {
        return result.ok ? result.json() : Promise.reject(new Error(`Ошибка ${result.status}`));
    }

    _request(path, options) {
        return fetch(`${this._baseURL}${path}`, options).then(this._getResult);
    }
}

const auth = new Auth();
export default auth;
