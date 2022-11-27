"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const authConfig_1 = __importDefault(require("../config/authConfig"));
const makeRefreshToken = (user, token, callback) => {
    jwt.sign({
        id: user.id,
        role: user.role,
        accessIssuer: authConfig_1.default.token.issuer,
    }, authConfig_1.default.refreshToken.secret, {
        expiresIn: authConfig_1.default.refreshToken.expireTime
    }, (error, refreshToken) => {
        if (error) {
            callback(error, null, null);
        }
        else if (refreshToken) {
            callback(null, token, refreshToken);
        }
        callback(error, null, null);
    });
};
const signToken = (user, callback) => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + Number(authConfig_1.default.token.expireTime) * 10000;
    try {
        jwt.sign({
            id: user.id,
            role: user.role,
        }, authConfig_1.default.token.secret, {
            expiresIn: authConfig_1.default.token.expireTime,
            issuer: authConfig_1.default.token.issuer
        }, (error, token) => {
            if (error) {
                callback(error, null, null);
            }
            else if (token) {
                makeRefreshToken(user, token, callback);
            }
        });
    }
    catch (error) {
        callback(error, null, null);
    }
};
exports.default = signToken;
