import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../ModalBase";
import CreateVehicle from "./CreateVehicle";
import { Vehicle } from "./VehicleDetails";
import { VehicleRecord } from "./VehicleRecord";
import "../../style/TablesView.css";
import { Searchbar } from "../Searchbar";


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

    const updateView = async () => {
        if(!queryResult) {
            fetchVehicles();
        }   
    }

    useEffect(() => {
        if(queryResult != null) {
            if(queryResult.length !== 0) {
                setVehicles(queryResult)
            }
        }

        if(!queryResult) {
            fetchVehicles();
        }   
    }, [queryResult])

    const queryParser = (q : string) => {
        const toks = q.split(' ');
        const query = {
            licensePlate: "",
            manufacturer: "",
            model: "",
            yearManufactured: "",
            skip: 0,
            limit: 1000,
        };

        for(let i = 0; i < toks.length; ++i){
            const token = toks[i];
            if (token === "licensePlate"){
                query.licensePlate = toks[i + 1];
            }
            else if (token === "manufacturer"){
                query.manufacturer = toks[i + 1];
            }
            else if (token === "model"){
                query.model = toks[i + 1];
            }
            else if (token === "yearManufactured"){
                query.yearManufactured = toks[i + 1];
            }
            ++i;
        }

        return query;
    }

    return (
        <div className="FullPage">
            <Searchbar path={ENDPOINTS.filterVehicle} setData={setQueryResult} queryParser={queryParser} 
            options = {[
                {name: "licensePlate", description:"The license plate of the vehicle"},
                {name: "manufacturer", description: "The manufactuer of the vehicle"},
                {name: "model", description: "The model of the vehicle"},
                {name: "yearManufactured", description: "The year the vehicle was manufactured"},
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
                            return(<VehicleRecord vehicle={value} key={index} observer={updateView}/>);
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

export default ViewVehicles;