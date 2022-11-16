import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../base/ModalBase";
import { Vehicle } from "./VehicleDetails";
import { VehicleRecord } from "./VehicleRecord";
import "../../style/TablesView.css";
import "../../style/VehiclesView.css";
import {Searchbar} from "../Searchbar";
import { CreateVehicle } from "./CreateVehicle";

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
        <div className="FullPage">
            <Searchbar path={ENDPOINTS.filterVehicle} all={ENDPOINTS.vehicles} setData={setQueryResult} queryParser={queryParser} flag ={flag}
                options = {[
                    {name: "licensePlate", description:"The license plate of the vehicle"},
                    {name: "manufacturer", description: "The manufacturer of the vehicle"},
                    {name: "model", description: "The model of the vehicle"},
                    {name: "yearManufactured", description: "The year manufactured of the vehicle"}
                ]}>
            <br />
            <div className="objectView">
                <table className="tableDiv">
                    <thead>
                        <tr>
                            <th className="licenseCol"> License Plate 
                                <span>
                                    <div>
                                        <button onClick={() => {
                                            sortAlphabetically(true);
                                        }}>▲</button>
                                    </div>
                                    <div>
                                        <button onClick={() => {
                                            sortAlphabetically(false);
                                        }}>▼</button> 
                                    </div>
                                </span>
                            </th>
                            <th className="manufacturerCol"> Manufacturer </th>
                            <th className="modelCol"> Model </th>
                            <th className="yearmanufacturedCol"> Year Manufactured </th>
                            <th className="editCol"></th>
                            <th className="delCol"></th>
                        </tr>
                    </thead>


                    <tbody className="tbodyDiv">
                        {vehicles.map((value, index) => {
                            return(<VehicleRecord vehicle={value} key={index} rerenderFlag={() => {setFlag(!flag)}}/>);
                        })}
                    </tbody>
                </table>
                <br></br>
                <div className="createBtn">
                    <ModalWrapper front={"Create Vehicle"}>
                        <CreateVehicle observer={updateView}/>
                    </ModalWrapper>
                </div>
            </div>
            </Searchbar>

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
    }

    return query;
}

export default ViewVehicles;