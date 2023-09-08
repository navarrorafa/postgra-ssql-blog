const {Pool} = require('pg')

const conectPool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database:'blog' ,
    password: "1234"

  });

  module.exports = {conectPool}