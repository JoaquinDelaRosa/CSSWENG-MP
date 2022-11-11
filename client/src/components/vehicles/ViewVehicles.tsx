import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../ModalBase";
import CreateVehicle from "./CreateVehicle";
import { Vehicle } from "./VehicleDetails";
import { VehicleRecord } from "./VehicleRecord";
import "../../style/TablesView.css";
import {Searchbar} from "../Searchbar";

const ViewVehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    const [queryResult, setQueryResult] = useState([]);

    const fetchVehicles = async () => {
        await createAPIEndpoint(ENDPOINTS.vehicles).fetch()
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                const vehicleList = data.map((value: any) => {
                    let vehicle: Vehicle = value;
                    return vehicle;
                });
                return vehicleList;
            })
            .then((list) => {
                setVehicles(list);
            })
            .catch((err) => {
                console.log(err)
            });
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const updateView = () => {
        fetchVehicles();
    }

    useEffect(() => {
        setVehicles(queryResult)
    }, [queryResult])

    return (
        <div className="FullPage">
            <Searchbar path={ENDPOINTS.filterVehicle} setData={setQueryResult} queryParser={queryParser} 
                options = {[
                    {name: "licensePlate", description:"The license plate of the vehicle"},
                    {name: "manafacturer", description: "The manafacturer of the vehicle"},
                    {name: "model", description: "The model of the vehicle"},
                    {name: "yearManafactured", description: "The year manafactured of the vehicle"}
                ]}/>
            <br />
            <div className="objectView">
                <table className="tableDiv">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th> License Plate </th>
                            <th> Manufacturer </th>
                            <th> Model </th>
                            <th> Year Manufactured </th>
                        </tr>
                    </thead>


                    <tbody className="tbodyDiv">
                        {vehicles.map((value, index) => {
                            return(<VehicleRecord vehicle={value} key={index}/>);
                        })}
                    </tbody>
                </table>

                <ModalWrapper front={"Create Vehicle"}>
                    <CreateVehicle observer={updateView}/>
                </ModalWrapper>

            </div>
        </div>
    )
}

const queryParser = (q : string) => {
    const toks = q.split(':');
    const query = {
        licensePlate: "",
        manufacturer: "",
        model: "",
        yearManafactured: "",
        skip: 0,
        limit: 1000
    };

    for(let i = 0; i < toks.length; ++i){
        const token = toks[i].trim();
        if (token === "licensePlate"){
            query.licensePlate = toks[i + 1]?.trim();
        }
        else if (token === "manafacturer"){
            query.manufacturer = toks[i + 1]?.trim();
        }
        else if (token === "model"){
            query.model = toks[i + 1]?.trim();
        }
        else if (token === "yearManafactured"){
            query.yearManafactured = toks[i + 1]?.trim();
        }
        ++i;
    }

    return query;
}

export default ViewVehicles;