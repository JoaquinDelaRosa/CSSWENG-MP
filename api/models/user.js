"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const crypto_1 = require("crypto");
const Roles = [
    "ADMIN",
    "VIEW_EDIT",
    "VIEW"
];
const DEFAULT_ROLE = "VIEW";
exports.UserSchema = new mongoose_1.default.Schema({
    id: { type: String, default: (0, crypto_1.randomUUID)() },
    firstName: String,
    lastName: String,
    username: String,
    role: {
        type: String,
        enum: Roles,
        default: DEFAULT_ROLE
    },
});
const User = mongoose_1.default.model('User', exports.UserSchema);
module.exports = User;
//# sourceMappingURL=user.js.map