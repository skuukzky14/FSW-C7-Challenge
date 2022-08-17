const express = require('express')
const router = express.Router()
const { checkCookie } = require('../helper/cookies')
const GameHistoryRouter = require('./GameHistoryRouter')
const AuthRouterRouter = require('./AuthRouter')
const DashboardRouter = require('./DashboardRouter')
const playRouter = require('./playRouter')


router.get('/', (req,res)=>{
    const { cookies } = req
    res.render('homepage', {loggedIn: cookies.login?true:false, role:cookies.login?.role})
})



router.use('/', AuthRouterRouter)
router.use('/', GameHistoryRouter)
router.use('/', DashboardRouter)
router.use('/', playRouter)


module.exports = router