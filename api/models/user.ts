import mongoose from "mongoose";
import { randomUUID } from "crypto";

export const Roles = {
    ADMIN: "ADMIN",
    VIEW_EDIT: "VIEW_EDIT",
    VIEW: "VIEW"
};

export const ALL_ROLES = [Roles.ADMIN, Roles.VIEW_EDIT, Roles.VIEW];
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

module.exports = User;