"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("./enum");
const DEFAULT_ROLE = enum_1.Roles.VIEW;
exports.UserSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
    },
    firstName: String,
    lastName: String,
    username: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: enum_1.Roles,
        default: DEFAULT_ROLE,
        require: true,
    },
}, { _id: false });
exports.User = mongoose_1.default.model('User', exports.UserSchema);
