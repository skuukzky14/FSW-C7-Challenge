const bcrypt = require('bcryptjs');

const encryptPassword=(password)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

const comparePassword=(password,hash)=>{
    console.log(password,hash)
    const compare = bcrypt.compareSync(password, hash)
    return compare
}

module.exports = {
    encryptPassword, comparePassword
}
