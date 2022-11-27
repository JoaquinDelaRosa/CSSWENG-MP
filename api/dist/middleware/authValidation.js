"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const authConfig_1 = __importDefault(require("../config/authConfig"));
const refreshToken_1 = __importDefault(require("../utils/refreshToken"));
const clearRefreshToken = (res) => {
    res.clearCookie("jwt");
};
const clearAccessToken = (res) => {
    res.clearCookie("jwtacc");
};
const handleRefreshTokenExpired = (res, error) => {
    clearRefreshToken(res);
    return res.json({
        message: "Refresh token expired, please log in again",
        error,
        auth: false,
    }).end();
};
const handleAccessTokenExpired = (res, token) => {
    clearAccessToken(res);
    res.cookie('jwtacc', token, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
    });
    res.locals.jwt = jwt.verify(token, authConfig_1.default.token.secret, { issuer: authConfig_1.default.token.issuer });
};
const validateToken = (req, res, next) => {
    var _a;
    const refToken = req.cookies.jwt;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // remove bearer
    if (token) {
        jwt.verify(token, authConfig_1.default.token.secret, { issuer: authConfig_1.default.token.issuer }, (error, decoded) => {
            // verify access token
            if (error) {
                jwt.verify(refToken, authConfig_1.default.refreshToken.secret, (error, refreshDecoded) => {
                    // refresh token
                    if (error) {
                        handleRefreshTokenExpired(res, error);
                    }
                    token = (0, refreshToken_1.default)(refToken);
                    if (token) {
                        handleAccessTokenExpired(res, token);
                        next();
                    }
                    else {
                        return res.json({
                            message: 'Reassigning token failure in authValidation middleware',
                            auth: false
                        }).end();
                    }
                });
            }
            else {
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        clearAccessToken(res);
        clearRefreshToken(res);
        return res.json({
            message: 'Unauthorized',
            auth: false,
        }).end();
    }
};
exports.default = validateToken;
