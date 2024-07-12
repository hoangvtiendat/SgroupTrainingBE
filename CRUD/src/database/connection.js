import mysql from 'mysql2/promise'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'Tiendat@123',
    database: 'backEnd',
})

export default connection
