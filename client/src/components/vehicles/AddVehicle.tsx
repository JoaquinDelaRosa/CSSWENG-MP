import React from 'react';
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import axios from 'axios'
import { VehicleRequest } from './VehicleDetails';
import { useForm } from 'react-hook-form';
import { isAlphabetic, isAlphanumeric } from '../../utils/Regex';


const AddVehicle = () => {
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(100),( val, index) => year - index);

    const {register, handleSubmit, formState: {errors}} = useForm<VehicleRequest>()
    
    const onSubmit = handleSubmit((data) => {
        createAPIEndpoint(ENDPOINTS.addVehicle).post(data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
   });
        
    
    return (
        <div>
            <p>Create Vehicle</p>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='licensePlate'>License Plate</label>
                    <input {... register('licensePlate', {required: true, pattern: isAlphanumeric})}
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
                    <input {... register('model', {required: true, pattern: isAlphabetic})}
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
                <input type="button" name="submit" onClick={onSubmit} value={"submit"}/>
            </form>
        </div>
    )
}

export default AddVehicle;