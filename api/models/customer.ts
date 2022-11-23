import mongoose from "mongoose";
import { randomUUID } from "crypto";

const validateEmail = (email) => {
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email)
};

export const CustomerSchema = new mongoose.Schema({
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
}, {_id: false});

export const Customer = mongoose.model('Customer', CustomerSchema);
