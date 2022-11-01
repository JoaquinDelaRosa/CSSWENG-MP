"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const crypto_1 = require("crypto");
const mongoose_1 = require("mongoose");
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
];
const DEFAULT_STATUS = "UNPAID";
const DEFAULT_TYPE = "PERSONAL";
const OrderSchema = new mongoose_1.default.Schema({
    id: { type: String, default: (0, crypto_1.randomUUID)() },
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
    vehicle: String,
    invoice: {
        id: { type: String, default: (0, crypto_1.randomUUID)() },
        amount: mongoose_1.default.Types.Decimal128,
        deductible: mongoose_1.default.Types.Decimal128,
        agentFirstName: String,
        agentLastName: String,
        datePaid: Date,
        agentComission: mongoose_1.default.Types.Decimal128
    },
    estimateNumber: String,
    scopeOfWork: String,
    expenses: [{
            id: { type: String, default: (0, crypto_1.randomUUID)() },
            dateRecorded: Date,
            description: String,
            amount: mongoose_1.default.Types.Decimal128,
        }]
});
exports.Order = mongoose_1.default.model('Order', OrderSchema);
