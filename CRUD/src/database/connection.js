import mysql from 'mysql2/promise'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

export default connection
