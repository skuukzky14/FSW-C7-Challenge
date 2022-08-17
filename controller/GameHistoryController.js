const { GameHistory } = require('../models')
const { verifyToken } = require('../helper/jwt')


const getHistory = async (req,res)=>{
    const { cookies } = req

    const histories = await GameHistory.aggregate([
        {$lookup:{
            from:'users',
            localField:'userId',
            foreignField:'_id',
            as:'userProfile'
        }}
    ])

    res.render('dashboard', {loggedIn: cookies.login?true:false, role:cookies.login?.role, histories})
}


const postResult = async (req,res)=>{
    const { cookies, body } = req
    const dataToken = verifyToken(cookies.login.token)
    const dataResult = {
        userId:dataToken._id,
        result:body.result,
        playerChoice:body.choice,
    }
    try {
        const postResult = await GameHistory.create(dataResult)
        res.status(200).json({postResult, message:'result'})
    } catch (error) {
        res.status(500).json({message:error})
    }
}


const deleteHistory = async (req,res)=>{
    const { _id } = req.params

    try {
        await GameHistory.deleteOne({_id:_id})
        res.status(201).json({message:'success'})
    } catch (error) {
        res.status(500).json({message:error})
    }
}


module.exports = {
    deleteHistory,postResult,getHistory
}