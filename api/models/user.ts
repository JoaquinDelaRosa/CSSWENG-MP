import mongoose from "mongoose";
import { randomUUID } from "crypto";
import { Roles } from "./enum";

const DEFAULT_ROLE = Roles.VIEW;

export const UserSchema = new mongoose.Schema({
    id: {type: String, default: randomUUID()},
    firstName: String,
    lastName: String,
    username: {
        type: String,
        unique: true,
    },
    password: String,
    role: {
        type: String,
        enum: Roles,
        default: DEFAULT_ROLE
    },
});

export const User = mongoose.model('User', UserSchema);