const express = require('express')
const router = express.Router()
const { adminCheck } = require('../middlewares/adminAuth')
const { postResult, deleteHistory } = require('../controller/GameHistoryController')

router.post('/postresult', postResult)
router.get('/deletehistory/:_id', adminCheck, deleteHistory)

module.exports = router