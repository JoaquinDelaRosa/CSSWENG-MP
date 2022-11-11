import { useState, useEffect } from "react";
import "../../style/TableButtons.css";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { DeleteVehicle } from "./DeleteVehicle";
import { UpdateVehicle } from "./UpdateVehicle";
import { Vehicle} from "./VehicleDetails";


export const VehicleRecord = (props : { vehicle: Vehicle}) => {
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
        setVehicle(null);
    }

    if (vehicle) {
        return (
            <tr>
                <td> <DeleteVehicle vehicle={props.vehicle} observer={onDelete}/></td>
                <td> <UpdateVehicle vehicle={props.vehicle} observer={onUpdate}/></td>
                <td> {vehicle?.licensePlate} </td>
                <td> {vehicle?.manufacturer} </td>
                <td> {vehicle?.model} </td>
                <td> {vehicle?.yearManufactured} </td>
            </tr> 
        );
    } else{
        return null;
    }
}
