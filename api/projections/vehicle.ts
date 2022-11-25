export const makeVehicleView = (document) => {
    if (document == null)
        return {};
    
    return {
        id : document._id,
        licensePlate: document.licensePlate,
        manufacturer: document.manufacturer,
        model: document.model,
        yearManufactured: document.yearManufactured,
        color: document.color,
        engine: document.engine,
        remarks: document.remarks

    };
}

export const makeVehicleArrayView = (documents) => {
    return documents.map((val) => {
        return makeVehicleView(val)
    });
}