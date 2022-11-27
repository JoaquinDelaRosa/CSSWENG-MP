"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = exports.CustomerSchema = void 0;
const mongoose_1 = require("mongoose");
const validateEmail = (email) => {
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
};
exports.CustomerSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
    },
    firstName: String,
    lastName: String,
    mobileNumber: String,
    email: String,
    company: String,
    insurance: String,
    remarks: String
}, { _id: false });
exports.Customer = mongoose_1.default.model('Customer', exports.CustomerSchema);
