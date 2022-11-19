import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { Vehicle } from "./VehicleDetails";

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
      <div className="deleteBtn">
        <button onClick={onSubmit}><i className="deleteIcon"></i></button>
      </div> 
    );
}