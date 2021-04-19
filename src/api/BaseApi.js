class BaseApi {
    constructor(baseURL) {
        this._base = baseURL;
        this._options = {
            method: 'GET',
        };
    }
    async getProductList(path = '') {
        const url = `${this._base}${path}`;
        return await fetch(url, this._options).then((response) => {
            return response.body ? response.json() : null;
        });
    }
}

export const apiInstance = new BaseApi('https://api.y-media.io/testjson/task');
