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
const cors = require('cors')
import pool from './database/connection'
import path from 'path'
import multer from 'multer'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    req.pool = pool
    next()
})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/public/uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
})

const uploadStorage = multer({ storage: storage })

// Single file
app.post('/upload/single', uploadStorage.single('file'), (req, res) => {
    console.log(req.file)
    return res.send('Single file')
})

//Multiple files
app.post('/upload/multiple', uploadStorage.array('file', 10), (req, res) => {
    console.log(req.files)
    return res.send('Multiple files')
})

// Use routers
app.use('/api', routers)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
