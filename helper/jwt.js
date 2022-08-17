const { sign, verify } = require('jsonwebtoken')


const tokenSign=(data)=>{
    const token = sign(data, 'binar')
    return token
}


const verifyToken=(token)=>{
    const verif = verify(token, 'binar')
    return verif
}


module.exports = {
    tokenSign,
    verifyToken
}