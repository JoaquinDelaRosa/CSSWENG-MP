import { randomUUID } from "crypto";
import mongoose from "mongoose";

export const VehicleSchema = new mongoose.Schema({
    _id : {
        type: String, 
        default: randomUUID(),
    },
    licensePlate : String,
    manufacturer : String,
    model : String,
    yearManufactured : Number,
});

export const Vehicle = mongoose.model('Vehicle', VehicleSchema);
