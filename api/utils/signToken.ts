import jwt = require('jsonwebtoken');
import config from "../config/authConfig";


// Not super safe just calling "user", but for some reason the interface I made wouldn't work, so I just don't type check it here
const signToken = (user,  callback: (error: Error | null, token: string | null) => void): void => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + Number(config.token.expireTime) * 10000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    try {
        console.info("Attempting Sign")
        console.log(user);
        jwt.sign(
            {
                id : user.id,
                role: user.role,
            },
            config.token.secret,
            {
                issuer: config.token.issuer,
                expiresIn: expirationTimeInSeconds,
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        callback(error, null);
    }
};

export default signToken;