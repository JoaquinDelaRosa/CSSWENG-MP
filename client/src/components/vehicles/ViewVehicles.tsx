import { useEffect, useState } from "react";
import { Vehicle } from "./VehicleDetails";
import { VehicleRecord } from "./VehicleRecord";
import {ViewHandler} from "../view/ViewHandler";
import { CreateVehicle } from "./CreateVehicle";
import { getRole, isRole } from "../../utils/CheckRole";
import { OptionButton } from "../../style/SearchbarStyle";
import { TableBody, TableHead } from "../../style/TableStyle";
import { CreateButton } from "../../style/CreateButton";
import { ENDPOINTS } from "../../api/endpoints";

const ViewVehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    const [queryResult, setQueryResult] = useState([]);

    const [flag, setFlag] = useState(false);

    const updateView = () => {
        setFlag(!flag);
    }

    useEffect(() => {
        setVehicles(queryResult)
    }, [queryResult]);

    useEffect(() => {
        console.log(getRole())
    }, []);


    const sortAlphabetically = (isAsc: Boolean ) => {
        if(isAsc){
            vehicles.sort((a : Vehicle, b : Vehicle) => {
                let fa = a.licensePlate.toLowerCase(),
                    fb = b.licensePlate.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            })
        }
        else{
            vehicles.sort((a : Vehicle, b : Vehicle) => {
                let fa = a.licensePlate.toLowerCase(),
                    fb = b.licensePlate.toLowerCase();

                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            })
        }

        setQueryResult([...vehicles]);
    };

    return (
        <div>
            <ViewHandler 
                path={ENDPOINTS.filterVehicle} 
                all={ENDPOINTS.vehicles} setData={setQueryResult} 
                queryParser={queryParser}
                flag ={flag}
                options = {[
                    {name: "licensePlate", description:"The license plate of the vehicle"},
                    {name: "manufacturer", description: "The manufacturer of the vehicle"},
                    {name: "model", description: "The model of the vehicle"},
                    {name: "yearManufactured", description: "The year manufactured of the vehicle"},
                    {name: "color", description: "The color of the vehicle"},
                    {name: "engine", description: "The engine model of the vehicle"}
                ]}>
            <br />

                <table>
                    <TableHead>
                        <tr>
                            <th> License Plate
                                <OptionButton onClick={() => {
                                    sortAlphabetically(true);
                                }}>▲</OptionButton>
                                <OptionButton onClick={() => {
                                    sortAlphabetically(false);
                                }}>▼</OptionButton>
                            </th>
                            <th> Manufacturer </th>
                            <th> Model </th>
                            <th> Year Manufactured </th>
                            <th> Color </th>
                            <th> Engine </th>
                            <th> Remarks </th>
                            <th hidden={isRole("VIEW")}></th>
                            <th hidden={isRole("VIEW")}></th>

                        </tr>
                    </TableHead>


                    <TableBody>
                        {vehicles.map((value, index) => {
                            return(<VehicleRecord vehicle={value} key={index} rerenderFlag={() => {setFlag(!flag)}}/>);
                        })}
                    </TableBody>
                </table>

                <br/>
                <CreateButton hidden={isRole("VIEW")}>
                    <CreateVehicle observer={updateView}/>
                </CreateButton>
            
            </ViewHandler>

        </div>
    )
}

const queryParser = (q : string) => {
    const toks = q.split(',');
    const query = {
        licensePlate: "",
        manufacturer: "",
        model: "",
        yearManufactured: 0,
        color: "",
        engine: "",
        skip: 0,
        limit: 1000
    };

    for(let i = 0; i < toks.length; ++i){
        const subtoks = toks[i].split(":");
        const key = subtoks[0].trim();
        const value = subtoks[1];

        if (key === "licensePlate"){
            query.licensePlate = value?.trim();
        }
        else if (key === "manufacturer"){
            query.manufacturer = value?.trim();
        }
        else if (key === "model"){
            query.model = value?.trim();
        }
        else if (key === "yearManufactured"){
            query.yearManufactured = parseInt(value?.trim());
        }
        else if (key === "color"){
            query.color = value?.trim();
        }
        else if (key === "engine"){
            query.engine = value?.trim();
        }
    }

    return query;
}

export default ViewVehicles;