const { verifyToken } = require('../helper/jwt')

const adminCheck=(req,res,next)=>{
    const { cookies } = req

    const userData = cookies.login?verifyToken(cookies.login.token):undefined
    if(userData?.role === 'admin'){
        next()
    }else{
        res.render('404')
    }
}


module.exports = {
    adminCheck
}