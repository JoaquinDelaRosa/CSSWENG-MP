export interface VehicleRequest {
    licensePlate: string,
    manufacturer: string,
    model: string,
    yearManufactured: Number
    color: string,
    engine: string,
    remarks: string,
}


export interface Vehicle {
    id : string,
    licensePlate: string,
    manufacturer: string,
    model: string,
    yearManufactured: number,
    color: string,
    engine: string,
    remarks: string,
}