const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const Config = require('../config/config')[env]

const sequelize = new Sequelize(
    Config.database,
    Config.username,
    Config.password,
    {
        ...Config,
        logging: false
    }
)

const auth = async() => {
    try{
    await sequelize.authenticate()
    console.log('Connected to Database')
    }catch(err){
        console.log('Error while connecting to db', err)
    }

}

auth()
module.exports = sequelize;