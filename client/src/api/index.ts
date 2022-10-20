import axios from "axios";

export const BASE_URL = 'https://localhost:5000/'

// Defines the token for session management, and constructs the different API endpoints to the backend.
var token = (sessionStorage.getItem("key") != null) ? sessionStorage.getItem("key") ! : "no token";
export const ENDPOINTS = {
    login: 'Authz/Login',
    register: 'Authz/Register',

    customers: 'Customer/all',
    vehicles: 'Vehicle/all',
    orders: 'Order/all',
    invoices: 'Invoice/all',
    customerTypes: 'CustomerType/all',
    orderStatuses: 'OrderStatus/all',

    getCustomer: 'Customer/id',
    getCustomerView: 'Customer/view',
    addCustomer: 'Customer/create',
    updateCustomer: 'Customer/update',
    deleteCustomer: 'Customer/delete',

    getVehicle: 'Vehicle/id',
    getVehicleView: 'Vehicle/view',
    addVehicle: 'Vehicle/create',
    updateVehicle: 'Vehicle/update',
    deleteVehicle: 'Vehicle/delete',

    getOrder: "Order/id",
    getOrderView: 'Order/view',
    addOrder: "Order/create",
    updateOrder: "Order/update",
    deleteOrder: "Order/delete",

    getInvoice: "Invoice/id",
    getInvoiceView: 'Invoice/view',
    addInvoice: "Invoice/create",
    updateInvoice: "Invoice/update",
    deleteInvoice: "Invoice/delete",

}

export const updateToken = (key: string) =>{
    sessionStorage.setItem("key", key);
    token = (sessionStorage.getItem("key") != null) ? sessionStorage.getItem("key")! : "no token";
}


export const createAPIEndpoint = (endpoint : string) => {

    let url = BASE_URL + 'api/' + endpoint + '/';
    
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