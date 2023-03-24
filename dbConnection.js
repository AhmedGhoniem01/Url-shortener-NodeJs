const mongoose = require('mongoose');
const config = require('config');
const dbURI = config.get('mongoURI');

const dbConnection = async() => {
    try{
        await mongoose.connect(dbURI, {useNewUrlParser: true});
        console.log('Mongo-db connected successfully...');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = dbConnection;