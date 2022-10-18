import React from 'react';
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import axios from 'axios'
import { VehicleRequest } from './VehicleDetails';

const year = (new Date()).getFullYear();
const years = Array.from(new Array(100),( val, index) => year - index);

const UpdateVehicle = () => {
    const [modifiedId, setModifiedId] = useState<number>(-1);
    const [formState, setFormState] = useState<VehicleRequest>({
        licensePlate: "",
        manufacturer: "",
        model: "",
        yearManufactured: 0,
    });

    const onInputChange = (name: string, value: any) => {
        setFormState(values => ({ ...values, [name]: value }));
    }

    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        console.log(formState)
        event.preventDefault();
        createAPIEndpoint(ENDPOINTS.updateVehicle).patch(formState, {"id": modifiedId})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
   };

    const onModifiedIdChanged = (id: number) => {
        setModifiedId(id);
        createAPIEndpoint(ENDPOINTS.getVehicle).fetch({"id" : id})
            .then((response) => {
                return response.data
            })
            .then((data) => {
                setFormState(data);
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
                <label> Id </label>
                <input type="number"
                    name="id"
                    onChange={(e) => {onModifiedIdChanged(parseInt(e.target.value))}}
                />
                <br/>
                <label>License Plate</label>
                <input type="text" 
                    name="licensePlate" 
                    onChange={(e) => { onInputChange("licensePlate", e.target.value);}}/>
                <br/>
                <label>Manufacturer</label>
                <input type="text" 
                    name="manufacturer" 
                    onChange={(e) => { onInputChange("manufacturer", e.target.value);}}/>
                <br/>
                <label>Model</label>
                <input type="text" 
                    name="model" 
                    onChange={(e) => { onInputChange("model", e.target.value);}}/>
                <br/>
                <label>Year Manufactured</label>
                <select onChange={(e) => {onInputChange("yearManufactured", parseInt(e.target.value)) }}>
                    {
                         years.map((year, index) => {
                            return (
                                <option key={index} value={year}> {year} </option>
                            )
                         })
                    }
                </select>
                <br/>
                <input type="button" 
                name="submit" 
                onClick={onSubmit} 
                value={"submit"}/>

            </form>
        </div>
   )
}

export default UpdateVehicle;