const Sequelize = require('sequelize');

const host = '34.122.34.203';
//TODO add ip of heroku in google cloud connections on deploy

const database = 'chat';
const username = 'anyclipchat';
const password = 'm6e3v?J8';

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