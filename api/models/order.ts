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
    vehicle : {type: String, ref: 'Vehicle'},
    
    invoice: {
        id: {type: String, default: randomUUID()},
        amount : {type:mongoose.Types.Decimal128, default: 0},
        deductible : {type:mongoose.Types.Decimal128, default: 0},
        agentFirstName : {type: String, default: "No Agent"},
        agentLastName : {type: String, default: "No Agent"},
        datePaid : {type:Date, default: () => new Date(+new Date() + 7*24*60*60*1000)},
        agentCommission : {type:mongoose.Types.Decimal128, default: 0},
    },
    estimateNumber: String,
    scopeOfWork: String,

    expenses: [{
        id: {type: String, default: randomUUID()},
        dateRecorded: Date,
        description: String,
        amount: mongoose.Types.Decimal128,
    }],
    isVerified: {
        type: Boolean,
        default: false,
    }
}, {_id: false});

export const Order = mongoose.model('Order', OrderSchema);