const { User, UserProfile } = require('../models')
const { tokenSign,verifyToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcryptjs')
const mongoose = require('mongoose')
const { encryptPassword } = require('../helper/bcryptjs')


const renderLogin=async(req,res)=>{
        const { cookies } = req
        res.render('login', {loggedIn: cookies.login?true:false, role:cookies.login?.role})
}

const getRegister=async(req,res)=>{
    const { cookies } = req
    res.render('register', {loggedIn: cookies.login?true:false, role:cookies.login?.role})
}

const postRegister=async(req,res)=>{
    console.log('s')
    const { cookies } = req
    const { usernameRegister:username, emailRegister:email,firstnameRegister:firstname,lastnameRegister:lastname,passwordRegister:password, confirmPasswordRegister:confirmPassword,genderRegister:gender} = req.body
    const dataUser = {username,email,password:encryptPassword(password), role:'user'}
    let profileUser = { firstname, lastname, gender, fullname:`${firstname} ${lastname}`}


    // const session = await mongoose.connection.startSession()


    if(password === confirmPassword){
        try {
            // session.startTransaction()
            // const postUser = await User.create([dataUser], {session})
            const postUser = await User.create([dataUser])
            profileUser.userId = postUser._id
            // await UserProfile.create([{...profileUser, userId:postUser[0]._id}], {session})
            await UserProfile.create([{...profileUser, userId:postUser[0]._id}])
            // await session.commitTransaction()
            res.render('login', {loggedIn: cookies.login?true:false, role:cookies.login?.role})
        } catch (error) {
            console.log(error)
            // await session.abortTransaction()
            res.json({message:error})           
        }
    }else{
        res.json({message:'password did not match'})
    }
    // session.endSession()
}

const login=async(req,res)=>{
    const { username, password } = req.body

    try {
        const user = await User.aggregate([
            { $match: {username:username}},
            { $lookup:{
                from:'userprofiles',
                localField:'_id',
                foreignField:'userId',
                as:'userProfile'
            }}
        ])
        const compare = comparePassword(password, user[0].password) 
        if(user[0] && compare){
            const token = tokenSign({email:user[0].email,_id:user[0]._id, role:user[0].role,userProfile:user[0].userProfile})
            res.cookie('login', {token, username, role:user[0].role} , 1)
            res.status(200).json({message:'login succeed', status:'succeed', redirected:'/'})
        }else{
            res.status(401).json({message:'username / password wrong!', status:'failed login'})  
        }

    } catch (error) {
        res.status(500).json({message:error})        
    }
}

const logout=(req,res)=>{
        res.clearCookie('login')
        res.status(200).json({message:'logout succeed', status:'succeed', redirected:'/'})
        res.end()
}



module.exports = {
    postRegister,getRegister,login,logout,renderLogin
}