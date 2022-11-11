import jwt = require('jsonwebtoken');
import config from "../config/authConfig";


// Not super safe just calling "user", but for some reason the interface I made wouldn't work, so I just don't type check it here
const signToken = (user,  callback: (error: Error | null, token: string | null, refreshToken: string | null) => void): void => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + Number(config.token.expireTime) * 10000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    try {
        jwt.sign(
            {
                id : user.id,
            },
            config.token.secret,
            {
                expiresIn: config.token.expireTime,
                issuer: config.token.issuer
            },
            (error, token) => {
                if (error) {
                    callback(error, null, null);
                } else if (token) {
                    const tk = token;
                    // make refresh token
                    jwt.sign(
                        {
                            role: user.role,
                        }
                        , config.refreshToken.secret,
                        {
                            expiresIn: config.refreshToken.expireTime
                        },
                        (error, refreshToken) => {
                            if(error) {
                                callback(error, null, null);
                            } 
                            else if(refreshToken) {
                                callback(null, tk, refreshToken);
                            } 
                        }
                    )
                }

            }
        );
    } catch (error) {
        callback(error, null, null);
    }
};

export default signToken;