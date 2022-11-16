import { randomUUID } from "crypto";
import mongoose, { Decimal128 } from "mongoose";
import { StatusEnum, TypeEnum } from "./enum";

const DEFAULT_STATUS = "UNPAID";
const DEFAULT_TYPE = "PERSONAL";

const OrderSchema = new mongoose.Schema({
    _id: {
        type: String, 
    },
    status: {
        type: String,
        enum: StatusEnum,
        default: DEFAULT_STATUS
    },
    
    timeIn: { type: Date },
    timeOut: { type: Date },

    customer: {type: String, ref: 'Customer'},
    type: {
        type: String,
        enum: TypeEnum,
        default: DEFAULT_TYPE
    },
    company: String,
    vehicle : {type: String, ref: 'Vehicle'},
    
    invoice: {
        id: {type: String, default: randomUUID()},
        amount : mongoose.Types.Decimal128,
        deductible : mongoose.Types.Decimal128,
        agentFirstName : String,
        agentLastName : String,
        datePaid : Date,
        agentCommission : mongoose.Types.Decimal128
    },
    estimateNumber: String,
    scopeOfWork: String,

    expenses: [{
        id: {type: String, default: randomUUID()},
        dateRecorded: Date,
        description: String,
        amount: mongoose.Types.Decimal128,
    }],
    verified: {
        type: Boolean,
        default: false,
    }
}, {_id: false});

export const Order = mongoose.model('Order', OrderSchema);