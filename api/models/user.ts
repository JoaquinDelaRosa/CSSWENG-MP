import mongoose from "mongoose";
import { randomUUID } from "crypto";
import { Roles } from "./enum";

const DEFAULT_ROLE = Roles.VIEW;

export const UserSchema = new mongoose.Schema({
    _id: {
        type: String, 
        default: randomUUID(),
    },
    firstName: String,
    lastName: String,
    username: {
        type: String,
        unique: true,
        require : true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: Roles,
        default: DEFAULT_ROLE,
        require: true,
    },
});

export const User = mongoose.model('User', UserSchema);