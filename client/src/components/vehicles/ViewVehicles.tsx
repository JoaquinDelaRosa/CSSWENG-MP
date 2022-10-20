import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import AddVehicle from "./AddVehicle";
import DeleteVehicle from "./DeleteVehicle";
import UpdateVehicle from "./UpdateVehicle";
import { Vehicle } from "./VehicleDetails";


const VehicleRecord = (props : { vehicle: Vehicle }) => {
    return (
        <tr>
            <td> {props.vehicle.licensePlate} </td>
            <td> {props.vehicle.manufacturer} </td>
            <td> {props.vehicle.model} </td>
            <td> {props.vehicle.yearManufactured} </td>
        </tr> 
     );
}

const ViewVehicles = () => {

    const [vehicles, setVehicles] = useState([]);

    const fetchVehicles = async () => {
        await createAPIEndpoint(ENDPOINTS.vehicles).fetch()
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                console.log(data)
                const vehicleList = data.map((value: any) => {
                    let vehicle: Vehicle = value;
                    return vehicle;
                });
                console.log(vehicleList)
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

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th> License Plate </th>
                        <th> Manufacturer </th>
                        <th> Model </th>
                        <th> Year Manufactured </th>
                    </tr>
                </thead>


                <tbody>
                    {vehicles.map((value, index) => {
                        return(<VehicleRecord vehicle={value} key={index}/>);
                    })}
                </tbody>
            </table>
            <AddVehicle/>
            <UpdateVehicle/>
            <DeleteVehicle/>
        </div>
    )
}

export default ViewVehicles;