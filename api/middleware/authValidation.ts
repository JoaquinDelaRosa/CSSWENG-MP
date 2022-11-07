import { NextFunction, Request, Response } from "express";
import jwt = require("jsonwebtoken");
import config from "../config/authConfig";

const validateToken = (req : Request, res : Response, next : NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1]; // remove bearer
    console.log(req.headers);
    if(token) {
        jwt.verify(token, config.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error,
                    error,
                })
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
};

export default validateToken;