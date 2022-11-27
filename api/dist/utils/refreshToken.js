"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const authConfig_1 = __importDefault(require("../config/authConfig"));
const refreshToken = (refreshjwt) => {
    const decoded = jwt.verify(refreshjwt, authConfig_1.default.refreshToken.secret);
    if (decoded) {
        return jwt.sign({
            id: decoded.id,
            role: decoded.role,
        }, authConfig_1.default.token.secret, {
            expiresIn: authConfig_1.default.token.expireTime,
            issuer: decoded.accessIssuer,
        });
    }
    return "";
};
exports.default = refreshToken;
