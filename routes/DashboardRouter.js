const express = require('express')
const router = express.Router()
const { adminCheck } = require('../middlewares/adminAuth')
const { renderDashboard } = require('../controller/Dashboard.Controller')

router.get('/dashboard', adminCheck , renderDashboard)

module.exports = router