export const makeVehicleView = (document) => {
    return {
        id : document.id,
        licensePlate: document.licensePlate,
        manufacturer: document.manufacturer,
        model: document.model,
        yearManufactured: document.yearManufactured
    }
}

export const makeVehicleArrayView = (documents) => {
    return documents.map((val) => {
        return makeVehicleView(val)
    })
}