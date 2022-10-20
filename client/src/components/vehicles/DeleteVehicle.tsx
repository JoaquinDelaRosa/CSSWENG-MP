import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { isVehicleExists } from '../../utils/CheckFKExists';

const DeleteVehicle = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<{id : number}>();
    const [vehicleExists, setVehicleExists] = useState<boolean>(true);

    const onSubmit = handleSubmit((data) => {
        createAPIEndpoint(ENDPOINTS.deleteVehicle).delete({"id" : data.id})
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
                    <input {... register('id', {required : true,
                    onChange: (e)=> {
                        isVehicleExists(parseInt(e.target.value), setVehicleExists);
                    }})} type="number" name="id"/>
                    {errors.id && <p>Vehicle ID is required</p>}
                    <p hidden={vehicleExists}> Vehicle does not exist</p>
                </div>
                <input type='button'name="submit" onClick={onSubmit} value={"submit"} />
            </form>
        </div>
    );
}

export default DeleteVehicle;