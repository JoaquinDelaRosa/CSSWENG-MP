import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import AddVehicle from "./AddVehicle";
import DeleteVehicle from "./DeleteVehicle";
import UpdateVehicle from "./UpdateVehicle";

interface Vehicle {
    licenseplate: string,
    manufacturer: string,
    model: string,
    yearmanufactured: number
}

const VehicleRecord = (props : { vehicle: Vehicle }) => {
    return (
        <tr>
            <td> {props.vehicle.licenseplate} </td>
            <td> {props.vehicle.manufacturer} </td>
            <td> {props.vehicle.model} </td>
            <td> {props.vehicle.yearmanufactured} </td>
        </tr> 
     );
}

const VehiclesView = () => {

    const [vehicles, setVehicles] = useState([]);

    const fetchVehicles = async () => {
        await createAPIEndpoint(ENDPOINTS.vehicles).fetch()
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                console.log(data)
                const vehicleList = data.map((value: any) => {
                    let vehicle: Vehicle;
                    vehicle = {
                        licenseplate: value.licensePlate,
                        manufacturer: value.manufacturer,
                        model: value.model,
                        yearmanufactured: value.yearManufactured
                    };
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

export default VehiclesView;