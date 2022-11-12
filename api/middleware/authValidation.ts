import { NextFunction, Request, Response } from "express";
import jwt = require("jsonwebtoken");
import config from "../config/authConfig";
import authz from "../controllers/authz";

const validateToken = (req : Request, res : Response, next : NextFunction) => {
    console.log("in validation")
    let token = req.headers.authorization?.split(' ')[1]; // remove bearer
    if(token) {
        jwt.verify(token, config.token.secret,  {issuer: config.token.issuer}, (error, decoded) => {
            if (error) {
                console.log(`Print error ${error}`)
                return res.status(401).json({
                    message: "Token Verification Failure",
                    error,
                })
            } else {
                res.locals.jwt = decoded;
                next();
            }
        })
    } else {
        console.log("here")
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
};

export default validateToken;