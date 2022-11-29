import { useState, useEffect } from "react";
import { createAPIEndpoint } from "../../api";
import { ModalWrapper } from "../base/ModalBase";
import { Vehicle, VehicleRequest } from "./VehicleDetails";
import { RequestVehicle } from "./RequestVehicle";
import { ENDPOINTS } from "../../api/endpoints";
import { EditButton } from "../../style/EditButton";
import { isRole } from "../../utils/CheckRole";

export const UpdateVehicle = (props : {vehicle : Vehicle, observer : Function}) => {
    const [data, setData] = useState<VehicleRequest>();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    
    useEffect(() => {
        if (isRole("VIEW")) {
            return;
        }
            
        createAPIEndpoint(ENDPOINTS.updateVehicle).post(data, {id: props.vehicle.id})
        .then(function (response) {
            props.observer();
            setIsVisible(false);
        })
        .catch(function (error) {
            console.log(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <EditButton>
          <ModalWrapper front={"Edit"} isVisible={isVisible} setIsVisible={setIsVisible}>
            <RequestVehicle setResponse={setData} default={props.vehicle}/>
          </ModalWrapper>
        </EditButton>
    )
}