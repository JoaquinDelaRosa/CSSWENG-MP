import axios from "axios";

export const BASE_URL = 'https://localhost:5000/'

export const ENDPOINTS = {
    login: 'Customer/all',
    customers: 'Customer/all'
}

export const createAPIEndpoint = (endpoint : string) => {

    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        post: (data? : any) => axios.post(url, data)
    }
}