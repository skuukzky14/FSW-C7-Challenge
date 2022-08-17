function checkCookie(req,res,next){
    const { cookies } = req
    console.log(cookies)
    if(cookies.login){
        next()
    }else{
        res.redirect('/login')
    }
}


module.exports = {
    checkCookie
}