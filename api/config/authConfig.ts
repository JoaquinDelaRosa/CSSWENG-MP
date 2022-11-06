const JWT_KEY = "cYscIXvgwx1ELOvhp2Clr91GH4faJRSLhawlqjyw";
const JWT_EXPIRE_TIME = 3600;
const JWT_ISSUER = 'AutoWorks'

const JWTConfig = {
    token : {
        expireTime: JWT_EXPIRE_TIME,
        issuer: JWT_ISSUER,
        secret: JWT_KEY,
    }
}

export default JWTConfig;