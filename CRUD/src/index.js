// import express from 'express';
// import fs from 'fs';
// import routers from './apis';


// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/api', routers);

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


import express from 'express'
import routers from './apis'
import pool from './database/connection'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    req.pool = pool
    next()
})

// Use routers
app.use('/api', routers)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
