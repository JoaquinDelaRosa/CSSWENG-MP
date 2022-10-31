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
    username: String,
    role: {
        type: String,
        enum: Roles,
        default: DEFAULT_ROLE
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;