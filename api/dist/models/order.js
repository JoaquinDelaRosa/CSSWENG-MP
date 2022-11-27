"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const crypto_1 = require("crypto");
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("./enum");
const DEFAULT_STATUS = "UNPAID";
const DEFAULT_TYPE = "PERSONAL";
const OrderSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
    },
    status: {
        type: String,
        enum: enum_1.StatusEnum,
        default: DEFAULT_STATUS
    },
    timeIn: { type: Date },
    timeOut: { type: Date },
    customer: { type: String, ref: 'Customer' },
    type: {
        type: String,
        enum: enum_1.TypeEnum,
        default: DEFAULT_TYPE
    },
    vehicle: { type: String, ref: 'Vehicle' },
    invoice: {
        id: { type: String, default: (0, crypto_1.randomUUID)() },
        amount: { type: mongoose_1.default.Types.Decimal128, default: 0 },
        deductible: { type: mongoose_1.default.Types.Decimal128, default: 0 },
        agentFirstName: { type: String, default: "---" },
        agentLastName: { type: String, default: "---" },
        datePaid: { type: Date, default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000) },
        agentCommission: { type: mongoose_1.default.Types.Decimal128, default: 0 },
    },
    estimateNumber: String,
    scopeOfWork: String,
    expenses: [{
            id: { type: String, default: (0, crypto_1.randomUUID)() },
            dateRecorded: Date,
            description: String,
            amount: mongoose_1.default.Types.Decimal128,
        }],
    isVerified: {
        type: Boolean,
        default: false,
    }
}, { _id: false });
exports.Order = mongoose_1.default.model('Order', OrderSchema);
