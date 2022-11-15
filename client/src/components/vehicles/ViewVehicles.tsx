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

    
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(1);
    const [skip, setSkip] = useState(0);

    const fetchVehicles = async () => {
        await createAPIEndpoint(ENDPOINTS.vehicles).fetch({skip: skip, limit: limit})
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
    }, [currentPage]);

    const updateView = () => {
        fetchVehicles();
    }

    useEffect(() => {
        setVehicles(queryResult)
    }, [queryResult, currentPage]);

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

    const nextPage = () => {
        setCurrentPage((page) => page + 1);
        setSkip((currentPage-1) * limit)
    }
  
    const previousPage = () => {
        if(currentPage - 1 <= 0){
            console.log("start of results")
        }
        else{
            setCurrentPage((page) => page - 1);
            setSkip((currentPage-1) * limit)
        }
    }


    return (
        <div className="FullPage">
            <Searchbar path={ENDPOINTS.filterVehicle} setData={setQueryResult} queryParser={queryParser}
                options = {[
                    {name: "licensePlate", description:"The license plate of the vehicle"},
                    {name: "manufacturer", description: "The manufacturer of the vehicle"},
                    {name: "model", description: "The model of the vehicle"},
                    {name: "yearManufactured", description: "The year manufactured of the vehicle"}
                ]}/>
            <br />
            <div className="objectView">
                <table className="tableDiv">
                    <thead>
                        <tr>
                            <th className="delCol"></th>
                            <th className="editCol"></th>
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
                        </tr>
                    </thead>


                    <tbody className="tbodyDiv">
                        {vehicles.map((value, index) => {
                            return(<VehicleRecord vehicle={value} key={index}/>);
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

            <span>
                <button>⮜⮜</button>
                <button onClick={previousPage}>
                        ⮜
                </button>

                <input type='text'></input>

                <button onClick={nextPage}>
                        ⮞
                </button> 
                <button>⮞⮞</button> 
            </span>

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