import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { VehicleRequest } from './VehicleDetails';
import { useEffect, useState } from "react";
import { RequestVehicle } from "./RequestVehicle";

const CreateVehicle = (props : {observer : Function}) => {
    const setData = (data : any) => {
        createAPIEndpoint(ENDPOINTS.addVehicle).post(data)
        .then(function (response) {
            props.observer();
        })
        .catch(function (error) {
            console.log(error);
        })
    };
        
    
    return (
        <div>
            <RequestVehicle setResponse={setData}/>
        </div>
    )
}

export default CreateVehicle;