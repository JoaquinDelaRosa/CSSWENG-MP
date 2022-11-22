import { createAPIEndpoint } from "../api"
import { ENDPOINTS } from "../api/endpoints"

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

