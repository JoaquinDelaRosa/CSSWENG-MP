import { useState, useEffect } from "react";
import { createAPIEndpoint } from "../../api";
import { ModalWrapper } from "../base/ModalBase";
import { Vehicle, VehicleRequest } from "./VehicleDetails";
import { RequestVehicle } from "./RequestVehicle";
import { ENDPOINTS } from "../../api/endpoints";

export const UpdateVehicle = (props : {vehicle : Vehicle, observer : Function}) => {
    const [data, setData] = useState<VehicleRequest>();
    
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.updateVehicle).post(data, {id: props.vehicle.id})
        .then(function (response) {
            props.observer();
        })
        .catch(function (error) {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <div>
          <ModalWrapper front={"Edit"}>
            <RequestVehicle setResponse={setData} default={props.vehicle}/>
          </ModalWrapper>
        </div>
    )
}