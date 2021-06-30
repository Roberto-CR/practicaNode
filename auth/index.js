const jwt = require('jsonwebtoken'); // npm i jsonwebtoken
const config= require('../config')
const error = require('../utils/error')

const secret = config.jwt.secret;

function sign(data){
    return jwt.sign(data,secret);
}

function verify(token) {
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        throw new Error(error.message)
    }
    
}

const check = {
    own:function(req,owner){
        const decoded = decodeHeader(req);
        console.log(decoded)

        //comprobar si es o no propio
        if (decoded.id !== owner) {
            throw error('No puedes hacer esto',401)
        }
    },
}

function getToken(auth) {
    if (!auth) {
        throw new Error('No viene token');
    }

    if (auth.indexOf('Bearer') === -1) {
        throw new Error('Formato invalido');
    }

    let token = auth.replace('Bearer', '');
    return token.trim();
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports={ // esto es exportado a  secure de ../api/components/user/secure.js
    sign,
    check,
}