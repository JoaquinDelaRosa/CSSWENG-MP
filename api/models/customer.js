"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
const mongoose_1 = require("mongoose");
const crypto_1 = require("crypto");
const validateEmail = (email) => {
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return re.test(email);
};
exports.CustomerSchema = new mongoose_1.default.Schema({
    id: { type: String, default: (0, crypto_1.randomUUID)() },
    firstName: String,
    lastName: String,
    mobileNumber: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Please fill in a valid email address"],
        validate: [validateEmail, 'Please fill in a valid email address']
    }
});
const Customer = mongoose_1.default.model('Customer', exports.CustomerSchema);
module.exports = Customer;
//# sourceMappingURL=customer.js.map