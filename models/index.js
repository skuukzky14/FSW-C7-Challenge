const { model } = require('mongoose')
const { userProfileSchema, userSchema, GameHistorySchema, GameRoomSchema} = require('../schema/mongooseSchema')

const User = model('User', userSchema);
const UserProfile = model('UserProfile', userProfileSchema);
const GameHistory = model('GameHistory', GameHistorySchema);
const GameRoom = model('GameRoom', GameRoomSchema);

module.exports = {
    User, UserProfile, GameHistory,GameRoom
}