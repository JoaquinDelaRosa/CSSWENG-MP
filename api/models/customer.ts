import mongoose from "mongoose";
import { randomUUID } from "crypto";

const validateEmail = (email) => {
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return re.test(email)
};

const CustomerSchema = new mongoose.Schema({
    id: {type: String, default: randomUUID()},
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

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;