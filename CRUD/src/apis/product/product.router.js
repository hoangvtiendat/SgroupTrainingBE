import express from 'express'

const route = express.Router()
route.get('/', function (req, res, next) {
    res.send('list products')
})
route.get('/:id', function (req, res, next) {
    res.send('get product by id')
})
export default route
