const express = require('express')
const router = express.Router()
const { checkCookie } = require('../helper/cookies')
const { renderPlay,createRoom,editPlayChoice, getRoom,renderVersusPlayer,renderBattleRoom } = require('../controller/playController')


router.get('/play', checkCookie, renderPlay)
router.get('/room', renderVersusPlayer)
router.get('/roomsapi/:id', getRoom)
router.get('/battle-room', renderBattleRoom)

router.post('/create-room', checkCookie, createRoom)
router.patch('/edit-choice', editPlayChoice)



module.exports = router