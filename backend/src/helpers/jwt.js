const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
    return accessToken;
}

const generateRefreshToken = (payload) => {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1y'});
    return refreshToken;
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}