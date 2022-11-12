import axios from "axios";

export const BASE_URL = 'http://localhost:3000/'

var token = (sessionStorage.getItem("key") != null) ? sessionStorage.getItem("key") ! : "no token";

export const ENDPOINTS = {
    login: 'authz/login',
    register: 'authz/register',
    refreshToken: 'authz/refresh',
    logout: 'authz/logout',

    orderTypes: 'order/types',
    orderStatuses: 'order/statuses',
    userRoles: 'user/roles',

    users: 'user/all',

    customers: 'customer/all',
    getCustomer: 'customer/id',
    addCustomer: 'customer/create',
    updateCustomer: 'customer/update',
    deleteCustomer: 'customer/delete',
    filterCustomer: 'customer/filter',

    vehicles: 'vehicle/all',
    getVehicle: 'vehicle/id',
    addVehicle: 'vehicle/create',
    updateVehicle: 'vehicle/update',
    deleteVehicle: 'vehicle/delete',
    filterVehicle: 'vehicle/filter',

    orders: 'order/all',
    getOrder: "order/id",
    addOrder: "order/create",
    updateOrder: "order/update",
    deleteOrder: "order/delete",
    filterOrder: 'order/filter',

    getUser: "user/id",
    getUserView: 'user/view',
    addUser: "user/create",
    updateUser: "user/update",
    deleteUser: "user/delete",
    filterUser: 'user/filter',

}

export const updateToken = (key: string) =>{
    sessionStorage.setItem("key", key);
    token = (sessionStorage.getItem("key") != null) ? sessionStorage.getItem("key")! : "no token";
}

export const createAPIEndpoint = (endpoint : string) => {
    axios.defaults.withCredentials = true
    let url = BASE_URL + 'api/' + endpoint ;
    return {
        fetch: (params?: any, headers:any = 
            {'Content-Type': 'application/json'
        }) => axios.get(url, {"headers" : {...headers , Authorization: `Bearer ${token}`}, "params": params}),

        post: (data: any, params?: any, headers: any = {
            'Content-Type': 'application/json'
        }) => axios.post(url, data, { "headers" : {...headers, Authorization: `Bearer ${token}`}, "params": params }),

        patch: (data: any, params?: any, headers: any = {
            'Content-Type': 'application/json'
        }) => axios.patch(url, data, {"headers": {...headers, Authorization: `Bearer ${token}`}, "params" : params}),

        delete: (params?: any, headers?: any) => axios.delete(url, {"headers": {...headers, Authorization: `Bearer ${token}`}, "params" : params})
    }
}