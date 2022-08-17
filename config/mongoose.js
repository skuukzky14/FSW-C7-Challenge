const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/c6challenge');
    } catch (error) {
        console.log(error)        
    }
}

module.exports = {
    main
}