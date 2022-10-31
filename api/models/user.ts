import mongoose from "mongoose";
import { randomUUID } from "crypto";

export const UserSchema = new mongoose.Schema({
    id: {type: String, default: randomUUID()},
    firstName: String,
    lastName: String,
    username: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;