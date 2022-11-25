const JWT_KEY = "cYscIXvgwx1ELOvhp2Clr91GH4faJRSLhawlqjyw";
const JWT_EXPIRE_TIME = '10m';
const JWT_ISSUER = 'AutoWorks'

const REFRESH_KEY = "UgFJJqOrCPvSAkaq0GXF1y6UQkKa1TLvRAJSP08ZTlwdtm0tlzCfgcNsElpyw6rQGPp8ej"
const REFRESH_EXPIRE_TIME = '24h';

const refreshToken = {
    expireTime: REFRESH_EXPIRE_TIME,
    secret: REFRESH_KEY
}

const token = {
    expireTime: JWT_EXPIRE_TIME,
    issuer: JWT_ISSUER,
    secret: JWT_KEY,
}

export default {token , refreshToken};