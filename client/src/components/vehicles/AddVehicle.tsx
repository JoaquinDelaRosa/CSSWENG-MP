import React from 'react';
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import axios from 'axios'
import { VehicleRequest } from './VehicleDetails';


const AddVehicle = () => {

    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(100),( val, index) => year - index);

    const [formState, setFormState] = useState<VehicleRequest>({
        licensePlate: "",
        manufacturer: "",
        model: "",
        yearManufactured: 0,
    })

    const onInputChange = (name: string, value: any) => {
        setFormState(values => ({ ...values, [name]: value }));
    }

    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        console.log(formState)
        event.preventDefault();
        createAPIEndpoint(ENDPOINTS.addVehicle).post(formState)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
   };
        
    
    return (
        <div>
            <p>Create Vehicle</p>
            <form>
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

export default AddVehicle;