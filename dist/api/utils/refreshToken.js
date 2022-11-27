"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const authConfig_1 = require("../config/authConfig");
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
