import { randomUUID } from "crypto";
import mongoose from "mongoose";
import { CustomerSchema } from "./customer";
import { VehicleSchema } from "./vehicle";


const OrderSchema = new mongoose.Schema({
    id: {type: String, default: randomUUID()},
    status: {
        type: String,
        enum: [
            "PAID", 
            "UNPAID", 
            "OK", 
            "PENDING", 
            "WITH BALANCE", 
            "QUOTE OR CHECK", 
            "FOR LOA OR INVOICE"
        ],
        default: "UNPAID"
    },
    
    timeIn: { type: Date },
    timeOut: { type: Date },

    customer: CustomerSchema,
    type: {
        type: String,
        enum: [
            "PERSONAL",
            "WALK IN",
            "FLEET",
            "INSURANCE"
        ],
        default: "PERSONAL"
    },
    company: String,
    vehicle :VehicleSchema,
    
    invoice: {
        id: {type: String, default: randomUUID()},
        amount : mongoose.Types.Decimal128,
        deductible : mongoose.Types.Decimal128, 
        agentFirstName : String,
        agentLastName : String,
        datePaid : Date,
        agentComission : mongoose.Types.Decimal128
    },
    estimateNumber: String,
    scopeOfWork: String,

    expenses: [{
        id: {type: String, default: randomUUID()},
        dateRecorded: Date,
        description: String,
        amount: mongoose.Types.Decimal128,
    }]

});

const Order = mongoose.model('Order', OrderSchema);

module.exports = OrderSchema;