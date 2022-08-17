const { GameHistory,User } = require('../models')


const renderDashboard = async (req,res)=>{
    const { cookies } = req
    const data = req.query.data || 'user'

    try {
        if(data === 'history'){
            var histories = await GameHistory.aggregate([
                {$lookup:{
                    from:'users',
                    localField:'userId',
                    foreignField:'_id',
                    as:'userProfile'
                }}
            ])
            res.render('dashboard', {loggedIn: cookies.login?true:false, role:cookies.login?.role, histories, users:false})
        }else if(data === 'user'){
            var users = await User.aggregate([
                {$lookup:{
                    from:'userprofiles',
                    localField:'_id',
                    foreignField:'userId',
                    as:'userProfile'
                }}
            ])
            console.log(users[0].userProfile[0].fullname)
            res.render('dashboard', {loggedIn: cookies.login?true:false, role:cookies.login?.role, users , histories:false})
        }

    } catch (error) {
        res.status(500).json({message:error})
    }


}


module.exports = {
    renderDashboard
}