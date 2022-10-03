import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";

interface Vehicle {
    licensePlate: string,
    manufacturer: string
    model: string,
    yearManufactured: number
}

const VehicleRecord = (props: { vehicle : Vehicle }) => {
    return (
        <tr>
            <td> {props.vehicle.licensePlate} </td>
            <td> {props.vehicle.manufacturer} </td>
            <td> {props.vehicle.model} </td>
            <td> {props.vehicle.yearManufactured} </td>
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
                const vehicleList = data.map((value: any) => {
                    let vehicle: Vehicle;
                    vehicle = {
                        licensePlate: value.licensePlate,
                        manufacturer: value.manufacturer,
                        model: value.model,
                        yearManufactured: value.yearManufactured
                    };
                    return vehicle;
                });

                return vehicleList
            })
            .then((list) => {
                setVehicles(list);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchVehicles();
    }, [])

    return (
        <div>
            <table>
                <tbody>
                    {vehicles.map((value, index) => {
                        return (<VehicleRecord vehicle={value} key={index} />);
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default VehiclesView;