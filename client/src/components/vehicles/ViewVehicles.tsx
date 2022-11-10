import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../ModalBase";
import CreateVehicle from "./CreateVehicle";
import { Vehicle } from "./VehicleDetails";
import { VehicleRecord } from "./VehicleRecord";
import "../../style/TablesView.css";


const ViewVehicles = () => {

    const [vehicles, setVehicles] = useState([]);

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

    const updateView = async () => {
        fetchVehicles();
    }

    useEffect(() => {
        fetchVehicles();
    }, []);

    return (
        <div className="FullPage">
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