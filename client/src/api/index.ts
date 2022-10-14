import axios from "axios";

export const BASE_URL = 'https://localhost:5000/'

export const ENDPOINTS = {
    login: 'Authz/Login',
    customers: 'Customer/all',
    vehicles: 'Vehicle/all',
    customerTypes: 'CustomerType/all',

    getCustomer: 'Customer/id',
    addCustomer: 'Customer/create',
    updateCustomer: 'Customer/update',
    deleteCustomer: 'Customer/delete',

    getVehicle: 'Vehicle/id',
    addVehicle: 'Vehicle/create',
    updateVehicle: 'Vehicle/update',
    deleteVehicle: 'Vehicle/delete'
}

export const createAPIEndpoint = (endpoint : string) => {

    let url = BASE_URL + 'api/' + endpoint + '/';

    return {
        fetch: (params?: any) => axios.get(url, {params}),

        post: (data: any, params?: any, headers: any = {
            'Content-Type': 'application/json'
        }) => axios.post(url, data, { headers, "params": params }),

        patch: (data: any, params?: any, headers: any = {
            'Content-Type': 'application/json'
        }) => axios.patch(url, data, {headers, "params" : params}),

        delete: (params?: any) => axios.delete(url, {"params" : params})
    }
}