import { randomUUID } from "crypto";
import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    id: {type: String, default: randomUUID()},
    timeIn: { type: Date },
    timeOut: { type: Date },
    customer: {
        
    },

    company: String,
    vehicle :{ 

    },
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

const Order = mongoose.model('Vehicle', OrderSchema);

module.exports = OrderSchema;