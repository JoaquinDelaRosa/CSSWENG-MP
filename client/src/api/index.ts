import axios from "axios";

export const BASE_URL = 'https://localhost:5000/'

export const ENDPOINTS = {
    login: 'Login',
    customers: 'Customer/all',
    vehicles: 'Vehicle/all',
    addCustomer: 'Customer/create'
}

export const createAPIEndpoint = (endpoint : string) => {

    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),

        post: (data?: any, headers: any = {
            'Content-Type': 'application/json'
        })  => axios.post(url, data, headers)
    }
}