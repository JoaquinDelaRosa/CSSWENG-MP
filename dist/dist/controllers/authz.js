"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bcrypt = require("bcryptjs");
const user_1 = require("../models/user");
const signToken_1 = __importDefault(require("../utils/signToken"));
const crypto_1 = require("crypto");
const register = (req, res) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: Bcrypt.hashSync(req.body.password, 10),
        role: req.body.role
    };
    user_1.User.create(Object.assign({ _id: crypto_1.randomUUID() }, newUser))
        .then(() => {
        res.end();
    }).catch((err) => {
        console.log(err);
    });
};
const login = (req, res) => {
    user_1.User.findOne({ username: req.body.username })
        .then((user) => {
        if (user) {
            Bcrypt.compare(req.body.password, user.password, (error, result) => {
                if (!result) {
                    return res.json({
                        auth: false,
                        message: "Incorrect Password!"
                    }).end();
                }
                else if (result) {
                    signToken_1.default(user, (err, token, refreshToken) => {
                        if (err) {
                            return res.status(500).json({
                                auth: false,
                                message: err.message,
                                error: err,
                            });
                        }
                        else if (token) {
                            if (refreshToken) {
                                res.cookie('jwt', refreshToken, {
                                    httpOnly: true,
                                    secure: true,
                                    sameSite: "none",
                                });
                                res.cookie('jwtacc', token, {
                                    httpOnly: false,
                                    secure: true,
                                    sameSite: "none",
                                });
                                return res.status(200).json({
                                    auth: true,
                                    message: "Authenticated",
                                    token: token,
                                    success: true,
                                });
                            }
                        }
                    });
                }
                else if (error) {
                    return res.json({
                        auth: false,
                        message: "Password Input Failure",
                    }).end();
                }
            });
        }
        else {
            res.json({
                auth: false,
                error: "User does not exist",
            }).end();
        }
    })
        .catch((error) => {
        res.sendStatus(500).json({
            auth: false,
            error: error
        });
    });
};
const logout = (req, res) => {
    res.clearCookie("jwt").clearCookie("jwtacc").end();
};
exports.default = { login, register, logout };
