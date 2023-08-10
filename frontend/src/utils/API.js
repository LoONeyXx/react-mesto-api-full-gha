import { apiOptions } from './constants';

class API {
    constructor(options) {
        this._headers = options.headers;
        this._baseURL = `${options.server}/${options.cohort}`;
    }

    _request(path, options) {
        return fetch(`${this._baseURL}/${path}`, options).then(this._getResult);
    }

    getCardsInfo() {
        return this._request('cards', {
            headers: this._headers,
        });
    }

    getProfileInfo() {
        return this._request('users/me', {
            headers: this._headers,
        });
    }

    setProfileInfo(info) {
        return this._request('users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                about: info.about,
            }),
        });
    }

    setProfileAvatar(info) {
        return this._request('users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: info.avatar,
            }),
        });
    }

    addNewCard(info) {
        return this._request('cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                link: info.link,
            }),
        });
    }

    deleteCard(id) {
        return this._request(`cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        });
    }

    changeLikeCardStatus(id, isLiked) {
        return isLiked ? this._removeLike(id) : this._addLike(id);
    }

    _addLike(id) {
        return this._request(`cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        });
    }

    _removeLike(id) {
        return this._request(`cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        });
    }

    _getResult(result) {
        return result.ok ? result.json() : Promise.reject(new Error(`Что то пошло не так`));
    }
}

const Api = new API(apiOptions);
export default Api;
