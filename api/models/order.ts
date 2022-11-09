import { randomUUID } from "crypto";
import mongoose from "mongoose";
import { StatusEnum, TypeEnum } from "./enum";

const DEFAULT_STATUS = "UNPAID";
const DEFAULT_TYPE = "PERSONAL";

const OrderSchema = new mongoose.Schema({
    id: {
        type: String, 
        default: randomUUID(), 
        require: true,
        unique: true
    },
    status: {
        type: String,
        enum: StatusEnum,
        default: DEFAULT_STATUS
    },
    
    timeIn: { type: Date },
    timeOut: { type: Date },

    customer: {type: mongoose.Types.ObjectId, ref: 'Customer'},
    type: {
        type: String,
        enum: TypeEnum,
        default: DEFAULT_TYPE
    },
    company: String,
    vehicle : {type: mongoose.Types.ObjectId, ref: 'Vehicle'},
    
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
    }],
    verified: {
        type: Boolean,
        default: false,
    }
});

export const Order = mongoose.model('Order', OrderSchema);