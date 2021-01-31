const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ExamResult = sequelize.define('examresult', {
   id: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     allowNull: false,
     primaryKey: true
   },
   examName: {
     type: Sequelize.STRING,
     allowNull: false
   },
   studentName: {
     type: Sequelize.STRING,
     allowNull: false
   },
   english: {
     type: Sequelize.INTEGER,
     allowNull: false
   },
   maths: {
     type: Sequelize.INTEGER,
     allowNull: false
   },
   physics: {
     type: Sequelize.INTEGER,
     allowNull: false
   },
   chemistry: {
     type: Sequelize.INTEGER,
     allowNull: false
   },
   totalMarks: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = ExamResult;