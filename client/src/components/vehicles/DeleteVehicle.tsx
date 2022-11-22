import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { DeleteContainer, DelIcon } from "../../style/DeleteButton";
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
      <DeleteContainer>
            <button onClick={onSubmit}><DelIcon></DelIcon> </button>
      </DeleteContainer>
    );
}