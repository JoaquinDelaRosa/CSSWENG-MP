import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { isVehicleExists } from '../../utils/CheckFKExists';
import { Vehicle } from './VehicleDetails';

const DeleteVehicle = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<Vehicle>();
    const [vehicleExists, setVehicleExists] = useState<boolean>(true);

    const onSubmit = handleSubmit((data) => {
        createAPIEndpoint(ENDPOINTS.deleteVehicle).delete({"id" : data.vehicleId})
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    })

    return (
        <div>
            <p> Delete </p>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="vehicleId"> Input Vehicle ID </label>
                    <input {... register('vehicleId', {required : true,
                    onChange: (e)=> {
                        isVehicleExists(parseInt(e.target.value), setVehicleExists);
                    }})} type="number" name="id"/>
                    {errors.vehicleId && <p>Vehicle ID is required</p>}
                </div>
                <input type='button'name="submit" onClick={onSubmit} value={"submit"} />
            </form>
        </div>
    );
    //todo TEST
}

export default DeleteVehicle;