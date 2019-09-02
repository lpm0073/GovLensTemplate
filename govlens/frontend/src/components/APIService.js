const API_URL = 'api';
import {
    GET_ONE,
    GET_MANY,
    GET_LIST,
    CREATE,
    UPDATE,
    DELETE
 } from './fetchActions.js'
import { stringify } from 'query-string';

const APIService = (requestType, resource, params) => {

    const createHttpRequest = (requestType, resource, params) => {
        let url = "";
        let options = {};

        switch(requestType){
            case CREATE:
                url = `${apiUrl}/${resource}/`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}/`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}/`;
                options.method = 'DELETE';
                break;
            case GET_ONE:
                url = `${API_URL}/${resource}/${params.id}/`;
                break;
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const { filter } = params;
                const query = {
                    page,
                    page_size: perPage,
                    ordering: `${order === 'ASC' ? '' : '-'}${field}`,
                    ...filter
                };
                url = `${API_URL}/${resource}/?${stringify(query)}`;
                break;
            }
        }
        return {url, options};
    }

    const convertHttpResponse = (response, type, resource, params) => {
        const { headers, json } = response;

        switch (type) {
            case GET_LIST:
                if ('count' in json){
                    return { data: json.results, total: json.count }
                } else if (headers.has('content-range')) {
                    return {
                        data: json,
                        total: parseInt(
                            headers
                            .get('content-range')
                            .split('/')
                            .pop(),
                            10
                        ),
                    };
                } else if ('detail' in json && json.detail === 'Invalid page.') {
                    return { data: [], total: 0 }
                } else {
                    throw new Error(
                        'The total number of results is unknown. The DRF data provider ' +
                        'expects responses for lists of resources to contain this ' +
                        'information to build the pagination. If you\'re not using the ' +
                        'default PageNumberPagination class, please include this ' +
                        'information using the Content-Range header OR a "count" key ' +
                        'inside the response.'
                    );
                }
            default:
                return { data: json };
        }
    }

    const {url, options} =  createHttpRequest(requestType, resource, params)
    var res = fetch(url, options);

    return res.then(function(response) {
        return response.text().then(function (text) {
           return {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            body: text
           };
        });
    }).then(function (_a) {
        var status = _a.status,
            statusText = _a.statusText,
            headers = _a.headers,
            body = _a.body;
        var json;

        try {
            json = JSON.parse(body);
        } catch (e) {}

        if(status < 200 || status >= 300) {
            return Promise.reject(new HttpError(json && json.message || statusText, status, json));
        }

        return Promise.resolve({
            status: status,
            headers: headers,
            body: body,
            json: json
        });
    }).then(parsed => convertHttpResponse(parsed, requestType, resource, params));
    /***
    return fetch(url, options)
        .then(function(response) {
            return response.text()
                .then(function(response) {
                    response => convertHttpResponse(response, requestType, resource, params);
                });
        });
    //return p.then(response => convertHttpResponse(response, requestType, resource, params));
      /***
        if (response.status !== 200) {
          return this.setState({ placeholder: "Something went wrong" });
        }
        return response.json();
      });***/
 }
export default APIService;
