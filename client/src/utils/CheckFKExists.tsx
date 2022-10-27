import { createAPIEndpoint, ENDPOINTS } from "../api"

export const isCustomerExists = (id: number, setter: any) => {
    if(Number.isNaN(id)) {
        setter(false)
        return
    }
            
    createAPIEndpoint(ENDPOINTS.getCustomer).fetch({"id" : id})
        .then((response) => {
            if(response.data)
                setter(true)
            else
                setter(false)
        })
        .catch((err) => {
            console.log(err);
        })
}

export const isVehicleExists = (id: number, setter: any) => {
    if(Number.isNaN(id)) {
        setter(false)
        return
    }
            
    createAPIEndpoint(ENDPOINTS.getVehicle).fetch({"id" : id})
        .then((response) => {
            if(response.data)
                setter(true)
            else
                setter(false)
        })
        .catch((err) => {
            console.log(err);
        })
}

export const isInvoiceExists = (id: number, setter: any) => {
    if(Number.isNaN(id)) {
        setter(false)
        return
    }
            
    createAPIEndpoint(ENDPOINTS.getInvoice).fetch({"id" : id})
        .then((response) => {
            if(response.data)
                setter(true)
            else
                setter(false)
        })
        .catch((err) => {
            console.log(err);
        })
}

export const isOrderExists = (id: number, setter: any) => {
    if(Number.isNaN(id)) {
        setter(false)
        return
    }
            
    createAPIEndpoint(ENDPOINTS.getOrder).fetch({"id" : id})
        .then((response) => {
            if(response.data)
                setter(true)
            else
                setter(false)
        })
        .catch((err) => {
            console.log(err);
        })
}

export const isExpenseExists = (id: number, setter: any) => {
    if(Number.isNaN(id)) {
        setter(false)
        return
    }
            
    createAPIEndpoint(ENDPOINTS.getExpense).fetch({"id" : id})
        .then((response) => {
            if(response.data)
                setter(true)
            else
                setter(false)
        })
        .catch((err) => {
            console.log(err);
        })
}



