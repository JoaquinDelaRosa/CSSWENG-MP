import { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { DeleteVehicle } from "./DeleteVehicle";
import { UpdateVehicle } from "./UpdateVehicle";
import { Vehicle} from "./VehicleDetails";
import { isRole } from "../../utils/CheckRole";

export const VehicleRecord = (props : { vehicle: Vehicle, rerenderFlag: Function}) => {
    const [vehicle, setVehicle] = useState<Vehicle | null>(props.vehicle);

    useEffect(() => {
        if (props && props.vehicle){
            setVehicle(props.vehicle);
        } else {
            setVehicle(null);
        }
    }, [props, props.vehicle])

    const onUpdate = () => {
        createAPIEndpoint(ENDPOINTS.getVehicle).fetch({id : props.vehicle.id})
        .then((response) => {
            setVehicle(response.data);
        })
    };

    const onDelete = () => {
        props.rerenderFlag();
    }

    if (vehicle) {
        return (
            <tr>
                <td> {vehicle?.licensePlate} </td>
                <td> {vehicle?.manufacturer} </td>
                <td> {vehicle?.model} </td>
                <td> {vehicle?.yearManufactured} </td>
                <td hidden={isRole("VIEW")}> <UpdateVehicle vehicle={props.vehicle} observer={onUpdate}/></td>
                <td hidden={isRole("VIEW")}> <DeleteVehicle vehicle={props.vehicle} observer={onDelete}/></td>
            </tr> 
        );
    } else{
        return null;
    }
}
