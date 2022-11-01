import { randomUUID } from "crypto";
import mongoose from "mongoose";
import { CustomerSchema } from "./customer";
import { VehicleSchema } from "./vehicle";

const StatusEnum = [
    "PAID", 
    "UNPAID", 
    "OK", 
    "PENDING", 
    "WITH BALANCE", 
    "QUOTE OR CHECK", 
    "FOR LOA OR INVOICE"
];

const TypeEnum = [
    "PERSONAL",
    "WALK IN",
    "FLEET",
    "INSURANCE"
]

const DEFAULT_STATUS = "UNPAID";
const DEFAULT_TYPE = "PERSONAL"

const OrderSchema = new mongoose.Schema({
    id: {type: String, default: randomUUID()},
    status: {
        type: String,
        enum: StatusEnum,
        default: DEFAULT_STATUS
    },
    
    timeIn: { type: Date },
    timeOut: { type: Date },

    customer: String,
    type: {
        type: String,
        enum: TypeEnum,
        default: DEFAULT_TYPE
    },
    company: String,
    vehicle :String,
    
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

export const Order = mongoose.model('Order', OrderSchema);