import { useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { VehicleRequest } from './VehicleDetails';
import { useForm } from 'react-hook-form';
import { isVehicleExists } from '../../utils/CheckFKExists';
import { isAlphabetic, isAlphaNumeric, isLicensePlate } from '../../utils/Regex';

const year = (new Date()).getFullYear();
const years = Array.from(new Array(100),( val, index) => year - index);

const UpdateVehicle = () => {
    const [modifiedId, setModifiedId] = useState<number>(-1);
    const {register, handleSubmit, formState: {errors}} = useForm<VehicleRequest>()
    const [vehicleExists, setVehicleExists] = useState<boolean>(true);
    
    const onSubmit = handleSubmit((data) => {
        console.log(data)
        createAPIEndpoint(ENDPOINTS.updateVehicle).patch(data, {"id": modifiedId})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
   });

    const onModifiedIdChanged = (id: number) => {
        if(Number.isNaN(id))
            return
        setModifiedId(id);
        createAPIEndpoint(ENDPOINTS.getVehicle).fetch({"id" : id})
            .then((response) => {
                return response.data
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error)
            })
   }

   return (
        <div>
            <p>Update Vehicle</p>
            <form>
                <div>
                    <label> Id </label>
                    <input type="number" name="id"
                        onChange={(e) => {
                            onModifiedIdChanged(parseInt(e.target.value))
                            isVehicleExists(parseInt(e.target.value),setVehicleExists);
                            }}/>
                            <p hidden={vehicleExists}>Vehicle does not exist</p>
                </div>
                <div>
                    <label htmlFor='licensePlate'>License Plate</label>
                    <input {... register('licensePlate', {required: true, pattern: isLicensePlate})}
                    type="text" name="licensePlate"/>
                    {errors.licensePlate && <p>License Plate is Required</p>}
                </div>
                <div>
                    <label htmlFor='manufacturer'>Manufacturer</label>
                    <input {... register('manufacturer', {required: true, pattern: isAlphabetic})}
                    type="text" name="manufacturer"/>
                    {errors.manufacturer && <p>Manufacturer is Required</p>}
                </div>
                <div>
                   <label htmlFor='model'>Model</label>
                   <input {...register('model', { required: true, pattern: isAlphaNumeric })}
                    type="text" name="model"/>
                    {errors.model && <p>Model is Required</p>}
                </div>
                <div>
                    <label htmlFor='yearManufactured'>Year Manufactured</label>
                    <select  {...register('yearManufactured', {valueAsNumber: true, required: true})} defaultValue="DEFAULT">
                        <option key={0} value="DEFAULT" disabled>  -- Select Year -- </option>
                        {
                            years.map((year, index) => {
                                return (
                                    <option key={index + 1} value={year}> {year} </option>
                                )
                            })
                        }
                    </select>
                    {errors.yearManufactured && <p>Year Manufactured is Required</p>}
                </div>
                <input type="button" 
                name="submit" 
                onClick={onSubmit} 
                value={"Submit"}/>

            </form>
        </div>
   )
}

export default UpdateVehicle;