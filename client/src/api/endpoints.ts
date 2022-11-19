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
    countVehicle: 'vehicle/count',

    orders: 'order/all',
    getOrder: "order/id",
    addOrder: "order/create",
    updateOrder: "order/update",
    deleteOrder: "order/delete",
    filterOrder: 'order/filter',
    verifyOrder: 'order/verify',

    getUser: "user/id",
    getUserView: 'user/view',
    addUser: "user/create",
    updateUser: "user/update",
    deleteUser: "user/delete",
    filterUser: 'user/filter',

}