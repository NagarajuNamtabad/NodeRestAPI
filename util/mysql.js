const db = require('mysql2');

const connectionPool = db.createPool({

   host:'localhost',
   user:'root',
   database:'student',
   password:'medha#12345'


})

module.exports =connectionPool;