import { useState, useEffect } from "react";
import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { ModalWrapper } from "../base/ModalBase";
import { RequestVehicle } from "../vehicles/RequestVehicle";
import { Vehicle, VehicleRequest } from "../vehicles/VehicleDetails";

export const VehicleSubform = (props: {observer: Function, default?: {id: string, licensePlate: string}}) => {
    const [query, setQuery] = useState<string>("");
    const [options, setOptions] = useState<Array<Vehicle>>([]);
    const [vehicle, setVehicle] = useState<VehicleRequest>();

    useEffect(() => {
        if (query === ""){
            setOptions([]);
        } else {
            createAPIEndpoint(ENDPOINTS.filterVehicle).fetch({ 
                manufacturer: "",
                model: "",
                yearManufactured: 0,
                licensePlate: query.trim(),  
                skip: 0, 
                limit: 10})
            .then((res) => {
                setOptions(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    } , [query])
    
    const setData = (data : any) => {
        createAPIEndpoint(ENDPOINTS.addVehicle).post(data)
        .then(function (response) {
            setVehicle(response.data);
            props.observer(response.data.id);
        })
        .catch(function (error) {
            console.log(error);
        })
    };
    return (
        <div> 
            <input onChange={(e) => {setQuery(e.target.value)} } defaultValue={vehicle ? vehicle.licensePlate : 
                props.default? props.default?.licensePlate : ""} />   

            <div> 
            <br />
                {
                    (options.length === 0 || !props.default) &&
                    <p> No Vehicles were found.</p>
                }
                {
                    options.length !== 0 && 
                    <select onChange={(e) => {props.observer(e.target.value)}} defaultValue={props.default?.id}> 
                        <option value={""}> {
                            <>{ "-- Select Vehicle --"}</> 
                        }
                        </option>
                        {
                            options.map((value, index) => {
                                return (
                                    <option value={value.id} key = {index}> {<>{value.licensePlate}</>} </option>
                                );})
                        }
                    </select>
                }
                { 
                    <div className="createVehicleButt">
                        <ModalWrapper front={"Create Vehicle"}> 
                            <RequestVehicle setResponse={setData} default={vehicle}/>
                        </ModalWrapper>
                    </div>
                }
            </div>
        </div>
    )
}