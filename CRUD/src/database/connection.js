// const mysql = require('mysql2')
// import mysql from 'mysql2'
// // Create the connection to database
// const connections = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Tiendat@123',
//     database: 'backEnd',
// })

// // A simple SELECT query
// connections.query('SELECT * FROM user',  function (err, results, fields) {
//     console.log(results) // results contains rows returned by server
//     console.log(fields) // fields contains extra meta data about results, if available
// })

// export default connections

// Get the client
// import mysql from 'mysql2/promise'

// // Create the connection to database
// const pool = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Tiendat@123',
//     database: 'backEnd',
// })

// // A simple SELECT query
// try {
//     const [results, fields] = await pool.query('SELECT * FROM user')

//     console.log(results) // results contains rows returned by server
//     console.log(fields) // fields contains extra meta data about results, if available
// } catch (err) {
//     console.log(err)
// }

// // Using placeholders
// export default pool;
