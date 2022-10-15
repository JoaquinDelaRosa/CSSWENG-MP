import axios from "axios";

export const BASE_URL = 'https://localhost:5000/'

var token = (sessionStorage.getItem("key") != null) ? sessionStorage.getItem("key") ! : "no token";
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
        fetch: (headers?:any, params?: any, ) => axios.get(url, {headers : {headers , Authorization: `Bearer ${token}`}, params}),

        post: (data: any, params?: any, headers: any = {
            'Content-Type': 'application/json'
        }) => axios.post(url, data, { headers : {headers, Authorization: `Bearer ${token}`}, "params": params }),

        patch: (data: any, params?: any, headers: any = {
            'Content-Type': 'application/json'
        }) => axios.patch(url, data, {headers: {headers, Authorization: `Bearer ${token}`}, "params" : params}),

        delete: (headers: any, params?: any) => axios.delete(url, {headers: {headers, Authorization: `Bearer ${token}`}, "params" : params})
    }
}