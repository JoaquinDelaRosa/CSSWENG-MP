import mongoose from "mongoose";
import { randomUUID } from "crypto";

const validateEmail = (email) => {
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email)
};

export const CustomerSchema = new mongoose.Schema({
    id: {type: String, default: randomUUID()},
    firstName: String,
    lastName: String,
    mobileNumber: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Email is required"],
        validate: [validateEmail, 'Please fill in a valid email address']
    }
});

export const Customer = mongoose.model('Customer', CustomerSchema);
