const Sequelize = require('sequelize');

const sequelize = new Sequelize('student', 'root', 'medha#12345', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;