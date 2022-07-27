
let mysql = require('mysql');

const dotenv = require('dotenv');

dotenv.config();


let db = mysql.createConnection({

    limit: process.env.DB_LIMIT,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME

});

db.connect((err) => {
    if (err) throw err

    console.log('connexions etablie sur la DB samen ...');
})

module.exports = db;