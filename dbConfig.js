const { MONGO } = require('./config')
const mongoose = require('mongoose');

const connectMong = async () => {
    try {
        const CS = MONGO.MONGOURL
        await mongoose.connect(CS)
        console.log('mongo connected successfully')
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectMong