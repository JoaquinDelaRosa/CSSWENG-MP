import { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { Customer, CustomerRequest } from "../customers/CustomerDetails";
import { RequestCustomer } from "../customers/RequestCustomer";
import { ModalWrapper } from "../ModalBase";
import { RequestVehicle } from "./RequestVehicle";
import { Vehicle, VehicleRequest } from "./VehicleDetails";

export const DeleteVehicle = (props : {vehicle : Vehicle, observer : Function}) => {
    const onSubmit = () => {
        createAPIEndpoint(ENDPOINTS.deleteVehicle).delete({"id" : props.vehicle.id})
            .then((response) => {
                props.observer();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
      <div>
        <button onClick={onSubmit}> Delete </button>
      </div> 
    );
}

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
    }, [data])

    return (
        <div>
          <ModalWrapper front={"Edit"}>
            <RequestVehicle setResponse={setData} default={props.vehicle}/>
          </ModalWrapper>
        </div>
    )
}

export const VehicleRecord = (props : { vehicle: Vehicle, observer: Function }) => {
    return (
        <tr>
            <td> <DeleteVehicle vehicle={props.vehicle} observer={props.observer}/></td>
            <td> <UpdateVehicle vehicle={props.vehicle} observer={props.observer}/></td>
            <td> {props.vehicle.licensePlate} </td>
            <td> {props.vehicle.manufacturer} </td>
            <td> {props.vehicle.model} </td>
            <td> {props.vehicle.yearManufactured} </td>
        </tr> 
     );
}
