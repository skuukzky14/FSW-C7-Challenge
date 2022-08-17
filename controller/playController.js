const { GameRoom } = require('../models')
const { tokenSign,verifyToken } = require('../helper/jwt')
const mongoose = require('mongoose')


const renderPlay=async(req,res)=>{
        const { cookies } = req
        const { battle } = req.query

        if(battle === 'bot'){
            res.render('playWithBot', {username: cookies.login.username})
        }else if(!battle){
            res.render('chooseEnemy', {username: cookies.login.username})
        }
}


const renderVersusPlayer=async(req,res)=>{
    try {
        const gameRooms = await GameRoom.find()
        console.log(gameRooms)
        res.render('playerRoom', {data:gameRooms})
    } catch (error) {
        res.status(500).json({message:error})
    }
}


const getRoom=async(req,res)=>{
    try {
        const gameRoom = await GameRoom.findById(req.params.id)
        res.status(200).json({gameRoom})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const renderBattleRoom=async(req,res)=>{
    const id = req.query.id
    const { cookies } = req
    const dataToken = verifyToken(cookies.login.token)



    try {
        const gameRoom = await GameRoom.aggregate([
            {$match:{_id:mongoose.Types.ObjectId(id)}},
            {$lookup:{
                from:'users',
                localField:'hostId',
                foreignField:'_id',
                as:'hostUser'
            }},
            {$lookup:{
                from:'users',
                localField:'challengerId',
                foreignField:'_id',
                as:'challengerUser' 
            }}
        ])


        if(dataToken._id === gameRoom[0].hostId.toString()){
            res.render('battleRoom',{message:'lawan anda challenger', enemy:gameRoom[0].challengerUser, roomStatus:gameRoom[0].roomStatus , data:JSON.stringify(gameRoom[0])})
        }else{
            res.render('battleRoom',{message:'lawan anda host', enemy:gameRoom[0].hostUser, roomStatus:gameRoom[0].roomStatus, data:JSON.stringify(gameRoom[0])})
        }
    } catch (error) {
        console.log(error)
    }
}



const createRoom=async(req,res)=>{
    const { cookies } = req
    const dataToken = verifyToken(cookies.login.token)
    const dataRoom = {
        hostId:dataToken._id,
        roomStatus:'available'
    }

    
    try {
        await GameRoom.create(dataRoom)
        const gameRooms = await GameRoom.find()
        res.render('playerRoom', {data:gameRooms})
    } catch (error) {
        res.status(500).json({message:error})
    }
}


const editPlayChoice=async(req,res)=>{
    const { cookie, data, choice } = req.body

    const dataToken = verifyToken(cookie.token)
    console.log(dataToken)


    try {
        const room = await GameRoom.findById(data._id)
        if(room.hostId.toString() === dataToken._id){
            const result = await GameRoom.updateOne({_id:data._id}, {$set:{hostChoice:data.hostChoice?data.hostChoice:choice, roomStatus:room.challengerChoice?'ended':'waiting'}})
            res.status(201).json({message:'berhasil update host', result})
        }else{
            const result = await GameRoom.updateOne({_id:data._id}, {$set:{challengerChoice:data.challengerChoice?data.challengerChoice:choice, challengerId:dataToken._id, roomStatus:room.hostChoice?'ended':'waiting'}})
            res.status(201).json({message:'berhasil update challenger', result})
        }
    } catch (error) {
        res.status(500).json({message:error})        
    }
}


module.exports = {
    renderPlay,createRoom,editPlayChoice,getRoom,renderVersusPlayer,renderBattleRoom
}