import mongoose from "mongoose";
import { randomUUID } from "crypto";

const Roles = [
    "ADMIN",
    "VIEW_EDIT",
    "VIEW"
];

const DEFAULT_ROLE = "VIEW"

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

module.exports = User;