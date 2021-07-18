const Sequelize = require('sequelize');
require('dotenv').config();

const host = process.env.DB_HOST;
//TODO add ip of heroku in google cloud connections on deploy

const database = process.env.DB_TABLE;
const username = process.env.DB_UNAME;
const password = process.env.DB_PSWD;

module.exports = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000
    }
});