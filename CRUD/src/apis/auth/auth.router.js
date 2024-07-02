import authController from './auth.controller'
import express from 'express'
const route = express.Router()
route.post('/login', authController.login)
route.post('/register', authController.register)

export default route
