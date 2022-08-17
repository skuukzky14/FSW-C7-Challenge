const { User, UserProfile } = require('../mongooseModels/index')
const { main } = require('../config/mongoose')
const { now, connection } = require('mongoose')
const { encryptPassword} = require('../helper/bcryptjs')


const users = [
    {username:'admin', password:encryptPassword('admin'),email:'admin@admin.com',role:'admin'},
    {username:'idham', password:encryptPassword('123'),email:'idham@learnbinar.com',role:'user'}
]

let usersProfile = [
    {firstname:'admin',lastname:'admin',fullname:'admin admin',umur:0,gender:'Unknown'},
    {firstname:'idham',lastname:'idham',fullname:'idham idham',umur:25,gender:'Laki Laki'}
]

main()
.then(()=>{
    console.log(`mongoose connected`)
    User.insertMany(users)
    .then((result)=>{
        console.log(result, 'User data successfully seeded')
        result.forEach((val,index)=>{
            usersProfile[index].userId = val
        })
        return UserProfile.insertMany(usersProfile)
    })
    .then((profileResult)=>{
        console.log(profileResult, 'User Profile data successfully seeded')
    })
    .catch(err=>{
        console.log(err)
    })
    .finally(()=>{
        connection.close()
    })
})
