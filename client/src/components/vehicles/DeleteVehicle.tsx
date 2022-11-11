import { createAPIEndpoint, ENDPOINTS } from "../../api";
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
      <div>
        <button onClick={onSubmit}> Delete </button>
      </div> 
    );
}