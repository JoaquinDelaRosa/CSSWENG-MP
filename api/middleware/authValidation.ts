import { NextFunction, Request, Response } from "express";
import jwt = require("jsonwebtoken");
import config from "../config/authConfig";
import refreshToken from "../utils/refreshToken";

const clearRefreshToken = (res : Response) => {
    res.clearCookie("jwt")
}

const clearAccessToken = (res : Response) => {
    res.clearCookie("jwtacc")
}

const handleRefreshTokenExpired = (res : Response, error: any) => {
    clearRefreshToken(res);
    return res.json({
        message: "Refresh token expired, please log in again",
        error,
        auth: false,
    }).end();
}

const handleAccessTokenExpired = (res: Response, token : any ) => {
    clearAccessToken(res);
    res.cookie('jwtacc', token, 
            {
                httpOnly: false,
                secure: true,
                sameSite: "none",
            })
    res.locals.jwt = jwt.verify(token, config.token.secret, {issuer: config.token.issuer})
   
}

const validateToken = (req : Request, res : Response, next : NextFunction) => {
    const refToken = req.cookies.jwt;

    let token = req.headers.authorization?.split(' ')[1]; // remove bearer
    if(token) {
        jwt.verify(token, config.token.secret,  {issuer: config.token.issuer}, (error, decoded) => {
            // verify access token
            if (error) {
                jwt.verify(refToken, config.refreshToken.secret, (error, refreshDecoded) => {
                    // refresh token
                    if(error) {
                        handleRefreshTokenExpired(res, error)
                    }
                    
                    token = refreshToken(refToken)
                    
                    if(token) {
                        handleAccessTokenExpired(res, token)
                        next();
                    }
                    else {
                        return res.json({
                            message: 'Reassigning token failure in authValidation middleware',
                            auth: false
                        }).end();
                    }
                });

            } else {
                res.locals.jwt = decoded;
                next();
            }
        })
    } else {
        clearAccessToken(res);
        clearRefreshToken(res);
        return res.json({
            message: 'Unauthorized',
            auth: false,
        }).end()
    }
};

export default validateToken;